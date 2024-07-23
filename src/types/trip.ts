import expense from "./expense.ts";
import log from "./log.ts";
import member from "./member.ts";
import { DocumentDirectoryPath, mkdir, readDir, readFile, unlink, writeFile } from "react-native-fs";
import { logger } from "../helpers/logger.ts";

export class trip {

    id: string = "";
    title: string = "";
    description: string = "";
    destination: string = "";
    date: { from: Date, to: Date } = { from: new Date(), to: new Date() };

    members: member[] = [];
    expenses: expense[] = [];
    logs: log[] = [];

    static allTrips: trip[] = [];

    constructor(){
        this.id = Math.random().toString(36);
        this.title = "";
        this.description = "";
        this.destination = "";
        this.date = { from: new Date(), to: new Date() };
        this.members = [];
        this.expenses = [];
        this.logs = [];
    }

    saveTrip(): Promise<void>{
        let path = DocumentDirectoryPath + "/trips/" + this.id + '.json';
        let thisdata = JSON.stringify({
            id: this.id,
            title: this.title,
            description: this.description,
            destination: this.destination,
            date: this.date,
            members: this.members,
            expenses: this.expenses,
            logs: this.logs
        });

        logger.log("Saving trip: " + thisdata)

        return new Promise<void>((resolve, reject) => {
            writeFile(path, thisdata, 'utf8').then((success) => {
                resolve();
            }).catch(() => {
                reject();
            });
        });
    }

    getMember(id: string): member | undefined{
        return this.members.find(mem => mem.id == id);
    }

    deleteTrip(): Promise<void>{
        let path = DocumentDirectoryPath + "/trips/" + this.id + '.json';
        trip.allTrips.filter(item => item.id != this.id);
        return unlink(path);
    }

    static loadTrips(onLoad:any = () => null): void {
        this.allTrips = [];
        trip.createFolder().then(() => {
            readDir(DocumentDirectoryPath + "/trips").then(result => {
                let pending = 0;
                result.forEach(item => {
                    if (item.isFile() && item.path.endsWith(".json")){
                        pending += 1;
                        readFile(item.path).then(result => {
                            logger.log(item.path);
                            logger.log(result);
                            try {
                                let data = JSON.parse(result);
                                let newTrip = new trip();
                                newTrip.id = data.id;
                                newTrip.title = data.title;
                                newTrip.description = data.description;
                                newTrip.destination = data.destination;
                                newTrip.date = data.date;
                                newTrip.date.from = new Date(newTrip.date.from)
                                newTrip.date.to = new Date(newTrip.date.to)
                                newTrip.members = [];
                                newTrip.expenses = [];
                                newTrip.logs = [];

                                data.members.forEach((item: any) => {
                                    let newMember = new member();
                                    newMember.id = item.id;
                                    newMember.name = item.name;
                                    newTrip.members.push(newMember);
                                })

                                data.logs.forEach((item: any) => {
                                    let newLog = new log();
                                    newLog.id = item.id;
                                    newLog.date = new Date(item.date);
                                    newLog.description = item.description;
                                    newLog.distance_traveled = item.distance_traveled;
                                    newLog.location = item.location;
                                    newLog.title = item.title;

                                    newTrip.logs.push(newLog);
                                })

                                data.expenses.forEach((item: any) => {
                                    let newExpense = new expense();
                                    newExpense.id = item.id;
                                    newExpense.title = item.title;
                                    newExpense.description = item.description;
                                    newExpense.amount = item.amount;
                                    newExpense.category = item.category;
                                    newExpense.date = new Date(item.date);
                                    newExpense.payers = item.payers;
                                    newExpense.spenders = item.spenders;

                                    newTrip.expenses.push(newExpense);
                                })
                                trip.allTrips.push(newTrip);
                                pending -= 1;
                                if (pending == 0) onLoad(trip.allTrips);
                            } catch (err){
                                pending -= 1;
                                if (pending == 0) onLoad(trip.allTrips);
                                logger.error(err)
                            }

                        }).catch((err) => {
                            pending -= 1;
                            if (pending == 0) onLoad(trip.allTrips);
                            logger.error(err)
                        })
                    }
                })
            })
        });
    }

    static getTrip(id: string): trip | undefined{
        return this.allTrips.find(trp => trp.id == id);
    }

    static createFolder(): Promise<void>{
        return mkdir(DocumentDirectoryPath + "/trips/");
    }

}
