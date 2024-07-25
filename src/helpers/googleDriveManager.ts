// GoogleDriveManager.js
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GoogleDriveAPI } from 'react-native-google-drive-api-wrapper';
import { readFile, writeFile } from "react-native-fs";
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
    webClientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
    offlineAccess: true,
});

class GoogleDriveManager {
    constructor() {
        this.driveApi = new GoogleDriveAPI({
            clientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com', // From Google Cloud Console
            scope: 'https://www.googleapis.com/auth/drive.file',
        });
    }

    async signIn() {
        try {
            await GoogleSignin.hasPlayServices();
            const user = await GoogleSignin.signIn();
            return user;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async signOut() {
        try {
            await GoogleSignin.signOut();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async uploadFile(filePath: any, fileName: string) {
        try {
            const fileContent = await readFile(filePath, 'base64');
            const response = await this.driveApi.uploadFile({
                name: fileName,
                mimeType: 'application/json',
                data: fileContent,
            });
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async downloadFile(fileId: any, filePath: string) {
        try {
            const response = await this.driveApi.downloadFile(fileId);
            await writeFile(filePath, response.data, 'base64');
            return filePath;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export default new GoogleDriveManager();
