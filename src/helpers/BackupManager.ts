import {DocumentDirectoryPath, readFile, writeFile} from "react-native-fs";
import {Logger} from "./Logger.ts";
import Toast from "react-native-simple-toast";
import Share from "react-native-share";
import DocumentPicker from "react-native-document-picker";
import {trip} from "../types/trip.ts";
import {singleExpense} from "../types/singleExpense.ts";
import memberAmount from "../types/memberAmount.ts";
import SettlementCalculator from "./SettlementCalculator.ts";
import {SettingsManager} from "./SettingsManager.ts";
import {FileManager} from "./FileManager.ts";

export class BackupManager {

    static async getReadableFile(): Promise<string>{
        return new Promise<string>((resolve, reject) => {
            let textArr: string[] = [];
            trip.loadTrips((trips: trip[]) => {
                for (const singleTrip of trips.sort((a, b) => b.date.from.getTime() - a.date.from.getTime())) {
                    textArr.push(`## ${singleTrip.title}\n`);
                    textArr.push(`Destination: ${singleTrip.destination}\n`);
                    textArr.push(`Date: ${singleTrip.date.from.toLocaleDateString()}\n`);
                    textArr.push("### Members\n");
                    for (const member of singleTrip.members) {
                        textArr.push(`- ${member.name}\n`);
                    }
                    textArr.push("### Expenses\n");
                    for (const expense of singleTrip.expenses.sort((a, b) => a.date.getTime() - b.date.getTime())) {
                        expense.calculateTotal();
                        let paid = expense.payers.filter(p => p.amount != 0).reduce((s: string, p: memberAmount) => {
                            return s + (`${p.member.name},`)
                        }, "").slice(0, -1);
                        let spent = expense.getCalculatedExpense().spenders.filter(p => p.amount != 0).reduce((s: string, p: memberAmount) => {
                            return s + (`${p.member.name},`)
                        }, "").slice(0, -1);
                        textArr.push(`${expense.date.toLocaleTimeString()} ${expense.date.toLocaleDateString()} - ${expense.title} paid by: ${paid}(${expense.amount}) -> spent by: ${spent}\n`)
                    }
                    textArr.push("### Logs\n");
                    for (const log of singleTrip.logs.sort((a, b) => a.date.getTime() - b.date.getTime())) {
                        textArr.push(`${log.date.toLocaleTimeString()} ${log.date.toLocaleDateString()} - ${log.title}\n`)
                    }
                    textArr.push("\n");
                    textArr.push('### Settlements\n')
                    for (const settlement of new SettlementCalculator(singleTrip.expenses.map(e => e.getCalculatedExpense())).settlements) {
                        textArr.push(`${settlement.spender.name} owes ${settlement.payer.name} ${SettingsManager.settings.currencySymbol} ${settlement.amount.toFixed(0)}\n`)
                    }
                }
                resolve(textArr.join(""))
            })
        });
    }

    static async generateBackupFile(content: string) {
        const fileName = 'trip-manager-backup.json';

        let generated = false;

        try {
            await FileManager.writeFile(fileName, content);
            generated = true;
        } catch (error) {
            Logger.error(error);
            Toast.show('Failed to generate backup file', Toast.SHORT);
        }

        if (generated) {
            try {
                await FileManager.shareFile(fileName, 'application/json');
            } catch (error) {
                Logger.log("Saving Failed: " + error)
            }
        }
    }

    static async generateTextFile(content: string) {
        const fileName = 'trip-manager.md';
        const filePath = `${DocumentDirectoryPath}/${fileName}`;

        let generated = false;

        try {
            await writeFile(filePath, content, 'utf8');
            generated = true;
        } catch (error) {
            Logger.error(error);
            Toast.show('Failed to generate backup file', Toast.SHORT);
        }

        if (generated) {
            try {
                const shareOptions = {
                    title: 'Download your file',
                    url: `file://${filePath}`,
                    type: 'text/markdown',
                };
                await Share.open(shareOptions);
            } catch (error) {
                Logger.log("Saving Failed: " + error)
            }
        }
    }


    static recoverBackupFromString(content: string | undefined) {
        try {
            let json = JSON.parse(content || "{}")
            for (const singleTrip of json.trips) {
                try {
                    let newTrip = trip.loadFromString(JSON.stringify(singleTrip));
                    newTrip.saveTrip();
                    Logger.log("Loaded trip: " + JSON.stringify(singleTrip))
                } catch (err) {
                    Logger.error(err);
                }
            }
            for (const singleExpenseEntry of json.singleExpenses) {
                try {
                    let newTrip = singleExpense.loadFromString(JSON.stringify(singleExpenseEntry));
                    newTrip.saveSingleExpense();
                    Logger.log("Loaded expense: " + JSON.stringify(singleExpenseEntry))
                } catch (err) {
                    Logger.error(err);
                }

            }

            Toast.show("Restored " + json.trips.length + " trips and " + json.singleExpenses.length + " single expenses", Toast.LONG);
            Logger.log("Restored " + json.trips.length + " trips and " + json.singleExpenses.length + " single expenses")

        } catch (err) {
            Logger.error(err);
            Toast.show("Invalid file format", Toast.SHORT);
        }

    }
}
