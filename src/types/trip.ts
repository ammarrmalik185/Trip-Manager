import expense from "./expense.ts";
import log from "./log.ts";
import member from "./member.ts";
import {DocumentDirectoryPath, mkdir, readDir, readFile, unlink, writeFile} from "react-native-fs";
import {Logger} from "../helpers/Logger.ts";
import {geoLog} from "./geoLog.ts";

export enum TripTheme{
    Default = 1,
    Mountains,
    Beach,
    City,
    Forest,
    Desert,
    Snow,
    Historical,
    Highways,
}

export const tripThemes = [
    { key: 1, value: "Default" },
    { key: 2, value: "Mountains" },
    { key: 3, value: "Beach" },
    { key: 4, value: "City" },
    { key: 5, value: "Forest" },
    { key: 6, value: "Desert" },
    { key: 7, value: "Snow" },
    { key: 8, value: "Historical" },
    { key: 9, value: "Highways" },
]

export function getTripThemeImage(theme: TripTheme){
    theme = theme || TripTheme.Default;
    // theme = TripTheme.Snow;
    switch (theme){
        case TripTheme.Beach:
            return require('../images/uiImages/tripImages/beach.jpg');
        case TripTheme.City:
            return require('../images/uiImages/tripImages/city.jpg');
        case TripTheme.Desert:
            return require('../images/uiImages/tripImages/desert.jpg');
        case TripTheme.Forest:
            return require('../images/uiImages/tripImages/forest.webp');
        case TripTheme.Historical:
            return require('../images/uiImages/tripImages/historical.jpeg');
        case TripTheme.Highways:
            return require('../images/uiImages/tripImages/highway.jpg');
        case TripTheme.Mountains:
            return require('../images/uiImages/tripImages/mountains.jpg');
        case TripTheme.Snow:
            return require('../images/uiImages/tripImages/snow.jpg');
        default:
            return require('../images/uiImages/tripImages/trip.jpg');
    }
}

export class trip {

    id: string = "";
    title: string = "";
    description: string = "";
    destination: string = "";
    theme: TripTheme = TripTheme.Default;
    date: { from: Date, to: Date } = { from: new Date(), to: new Date() };

    members: member[] = [];
    expenses: expense[] = [];
    logs: log[] = [];
    geoLogs: geoLog[] = [];

    static allTrips: trip[] = [];

    constructor(){
        this.id = Math.random().toString(36);
        this.title = "";
        this.description = "";
        this.destination = "";
        this.theme = TripTheme.Default;
        this.date = { from: new Date(), to: new Date() };
        this.members = [];
        this.expenses = [];
        this.geoLogs = [];
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
            theme: this.theme,
            members: this.members,
            expenses: this.expenses,
            geoLogs: this.geoLogs,
            logs: this.logs
        });

        Logger.log("Saving trip: " + thisdata)

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
                if (result.length <= 0) onLoad([])
                result.forEach(item => {
                    if (item.isFile() && item.path.endsWith(".json")){
                        pending += 1;
                        readFile(item.path).then(result => {
                            Logger.log(item.path);
                            Logger.log(result);
                            try {
                                trip.allTrips.push(trip.loadFromString(result));
                                pending -= 1;
                                if (pending == 0) onLoad(trip.allTrips);
                            } catch (err){
                                pending -= 1;
                                if (pending == 0) onLoad(trip.allTrips);
                                Logger.error(err)
                            }

                        }).catch((err) => {
                            pending -= 1;
                            if (pending == 0) onLoad(trip.allTrips);
                            Logger.error(err)
                        })
                    }
                })
            })
        });
    }

    static loadFromString(content: string) : trip{
        let data = JSON.parse(content);
        let newTrip = new trip();

        newTrip.id = data.id;
        newTrip.title = data.title;
        newTrip.description = data.description;
        newTrip.theme = data.theme;
        newTrip.destination = data.destination;
        newTrip.date = data.date;
        newTrip.date.from = new Date(newTrip.date.from)
        newTrip.date.to = new Date(newTrip.date.to)
        newTrip.members = [];
        newTrip.expenses = [];
        newTrip.logs = [];
        newTrip.geoLogs = [];

        data.members.forEach((item: any) => {
            let newMember = new member();
            newMember.id = item.id;
            newMember.name = item.name;
            newMember.description = item.description;
            newMember.email = item.email;
            newMember.phone = item.phone;
            newTrip.members.push(newMember);
        })

        data.logs.forEach((item: any) => {
            let newLog = new log();
            newLog.id = item.id;
            newLog.date = new Date(item.date);
            newLog.description = item.description;
            newLog.geoLocation = item.geoLocation;
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

        if (data.geoLogs == undefined) data.geoLogs = [];
        data.geoLogs.forEach((item: any) => {
            let newGeoLog = new geoLog();
            newGeoLog.id = item.id;
            newGeoLog.date = new Date(item.date);
            newGeoLog.geoLocation = item.geoLocation;
            if (newGeoLog.geoLocation != undefined){
                newTrip.geoLogs.push(newGeoLog);
            }
        })

        return newTrip;
    }

    static getTrip(id: string): trip | undefined{
        return this.allTrips.find(trp => trp.id == id);
    }

    static createFolder(): Promise<void>{
        return mkdir(DocumentDirectoryPath + "/trips/");
    }
}
