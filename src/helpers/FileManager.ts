import {DocumentDirectoryPath, mkdir, readDir, readFile, unlink, writeFile} from "react-native-fs";
import Share from "react-native-share";
import DocumentPicker from "react-native-document-picker";
import {DocumentPickerOptions} from "react-native-document-picker/src";

export class File {
    path: string;
    content: string;

    info: any;

    constructor(path: string, content: string, info: any) {
        this.path = path;
        this.content = content;
        this.info = info;
    }
}

export class FileManager{

    static basePath :string = DocumentDirectoryPath + "/";

    static async writeFile(filePath: string, data: string) {
        try {
            await writeFile(FileManager.basePath + filePath, data, 'utf8');
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async readFile(filePath: string) {
        try {
            const data = await readFile(FileManager.basePath + filePath, 'utf8');
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async deleteFile(filePath: string) {
        try {
            await unlink(FileManager.basePath + filePath);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async readDir(dirPath: string) {
        try {
            await readDir(FileManager.basePath + dirPath);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async readDirectoryFiles(dirPath: string) {
        let files = (await readDir(FileManager.basePath + dirPath)).filter(file => file.isFile());
        let fileContents : File[] = [];
        await Promise.all(files.map(async (file) => {
            return readFile(file.path, "utf8").then(content => {
                fileContents.push(new File(file.path, content, file));
            }).catch(console.error)
        }))
        return fileContents;
    }

    static async createDir(dirPath: string) {
        try {
            await mkdir(FileManager.basePath + dirPath);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async ensureDir(dirPath: string) {
        try {
            const dirExists = await FileManager.dirExists(dirPath);
            if (!dirExists) {
                await FileManager.createDir(dirPath);
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async dirExists(dirPath: string) {
        try {
            await readDir(FileManager.basePath + dirPath);
            return true;
        } catch (error) {
            return false;
        }
    }

    static async shareFile(filePath: string, mimeType: string) {
        return Share.open({
            url: "file://" + FileManager.basePath + filePath,
            type: mimeType,
        });
    }

    static async pickSingleFile(options: DocumentPickerOptions){
        try {
            options.allowMultiSelection = false;
            const res = await DocumentPicker.pick(options);
            const filePath = res[0].uri;
            return await readFile(filePath, 'utf8');
        } catch (err) {
            throw err;
        }
    }

}
