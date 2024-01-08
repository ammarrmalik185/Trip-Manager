import expense from "./expense.ts";
import log from "./log.ts";
import member from "./member.ts";
import { DocumentDirectoryPath, readDir, readFile, writeFile } from "react-native-fs";

export class trip {
    id: string = "";
    title: string = "";
    description: string = "";
    destination: string = "";
    date: { from: Date, to: Date } = { from: new Date(), to: new Date() };

    members: member[] = [];
    expenses: expense[] = [];
    logs: log[] = [];

    static allTrips: trip[] = [
//        { id: '1', title: "Honeymoon", description: "",destination: 'Paris', date: {from: new Date(), to: new Date()},expenses: [],logs: [],members: []},
//        { id: '2', title: "Test", description: "", destination: 'New York', date: {from: new Date(), to: new Date()}, members: [], expenses: [], logs: [] },
//        { id: '3', title: "Test 2", description: "",destination: 'Tokyo', date: {from: new Date(), to: new Date()}, members: [], expenses: [] , logs: []},
    ];

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

    static getTrip(id: string) : trip | undefined{
        return this.allTrips.find(trp => trp.id == id);
    }

    saveTrip(): Promise<void>{
        let path = DocumentDirectoryPath + "/" + this.id + '.json';
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

        return new Promise<void>((resolve, reject) => {
            writeFile(path, thisdata, 'utf8')
                .then((success) => {
                    console.log(success)
                    resolve();
                }).catch(() => {
                reject();
            });
        });
    }

    static loadTrips(): void {
        console.log("Trip Detection Started")
        this.allTrips = [];
        readDir(DocumentDirectoryPath).then(result => {
            console.log("Trip Detected " + result.length)
            result.forEach(item => {
                console.log(item.path)
                if (item.isFile() && item.path.endsWith(".json")){
                    console.log("Trip Detected")
                    readFile(item.path).then(result => {
                        console.log(result)
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

                            console.log("Trip Detected 3")

                            trip.allTrips.push(newTrip);
                        } catch (err){
                            console.error(err)
//                            unlink(item.path);
                        }

                    }).catch(console.error)
                }
            })
        })
    }
}
