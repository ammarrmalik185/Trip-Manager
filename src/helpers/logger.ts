import * as fs from "react-native-fs";
import { DocumentDirectoryPath } from "react-native-fs";

enum logMode{
    console,
    file
}

let currentLogModes : logMode[] = [];

export let logger = {
    log: (txt: string) => {
        let text = "[LOG][" + Date.now() + "] = " + txt;
        for (const currentLogMode of currentLogModes) {
            switch (currentLogMode){
                case logMode.file:
                    fs.appendFile(DocumentDirectoryPath + "/logs" , text)
                    break;
                case logMode.console:
                   console.log(txt)
                    break;
            }
        }
    },
    error: (txt: unknown) => {
        let text = "[ERROR][" + Date.now() + "] = " + txt;
        for (const currentLogMode of currentLogModes) {
            switch (currentLogMode){
                case logMode.file:
                    fs.appendFile(DocumentDirectoryPath + "/logs" , text)
                    break;
                case logMode.console:
                    console.error(txt)
                    break;
            }
        }
    }
}
