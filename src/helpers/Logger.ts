import * as fs from "react-native-fs";
import {DocumentDirectoryPath} from "react-native-fs";

enum logMode{
    console,
    file
}

let currentLogModes : logMode[] = [logMode.file];

export let Logger = {
    log: (txt: string) => {
        let time = new Date(Date.now());
        let text = "[LOG][" + time.toDateString() + " " + time.toTimeString() + "] = " + txt;
        for (const currentLogMode of currentLogModes) {
            switch (currentLogMode){
                case logMode.file:
                    fs.appendFile(DocumentDirectoryPath + "/logs.txt" , text)
                    break;
                case logMode.console:
                   console.log(text)
                    break;
            }
        }
    },
    error: (txt: unknown) => {
        let time = new Date(Date.now());
        let text = "[ERROR][" + time.toDateString() + " " + time.toTimeString() + "] = " + txt;
        for (const currentLogMode of currentLogModes) {
            switch (currentLogMode){
                case logMode.file:
                    fs.appendFile(DocumentDirectoryPath + "/logs.txt" , text)
                    break;
                case logMode.console:
                    console.error(text)
                    break;
            }
        }
    }
}
