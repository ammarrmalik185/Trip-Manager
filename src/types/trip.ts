import expense from "./expense.ts";
import log from "./log.ts";
import member from "./member.ts";
import {Logger} from "../helpers/Logger.ts";
import {FileManager} from "../helpers/FileManager.ts";

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
    { key: TripTheme.Default, value: "Default" },
    { key: TripTheme.Mountains, value: "Mountains" },
    { key: TripTheme.Beach, value: "Beach" },
    { key: TripTheme.City, value: "City" },
    { key: TripTheme.Forest, value: "Forest" },
    { key: TripTheme.Desert, value: "Desert" },
    { key: TripTheme.Snow, value: "Snow" },
    { key: TripTheme.Historical, value: "Historical" },
    { key: TripTheme.Highways, value: "Highways" },
]

export function getTripThemeImage(theme: TripTheme){
    theme = theme || TripTheme.Default;
    switch (theme){
        case TripTheme.Beach: return ImageLoader.loadSRCImage('../images/uiImages/tripImages/beach.jpg');
        case TripTheme.City: return ImageLoader.loadSRCImage('../images/uiImages/tripImages/city.jpg');
        case TripTheme.Desert: return ImageLoader.loadSRCImage('../images/uiImages/tripImages/desert.jpg');
        case TripTheme.Forest: return ImageLoader.loadSRCImage('../images/uiImages/tripImages/forest.webp');
        case TripTheme.Historical: return ImageLoader.loadSRCImage('../images/uiImages/tripImages/historical.jpeg');
        case TripTheme.Highways: return ImageLoader.loadSRCImage('../images/uiImages/tripImages/highway.jpg');
        case TripTheme.Mountains: return ImageLoader.loadSRCImage('../images/uiImages/tripImages/mountains.jpg');
        case TripTheme.Snow: return ImageLoader.loadSRCImage('../images/uiImages/tripImages/snow.jpg');
        default: return ImageLoader.loadSRCImage('../images/uiImages/tripImages/trip.jpg');
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
        this.logs = [];
    }

    saveTrip(): Promise<void>{
        let path = `trips/${this.id}.json`;
        let thisData = JSON.stringify({
            id: this.id,
            title: this.title,
            description: this.description,
            destination: this.destination,
            date: this.date,
            theme: this.theme,
            members: this.members,
            expenses: this.expenses,
            logs: this.logs
        });

        Logger.log("Saving trip: " + thisData)
        return FileManager.writeFile(path, thisData);
    }

    deleteTrip(): Promise<void>{
        let path = `/trips/${this.id}.json`;
        trip.allTrips.filter(item => item.id != this.id);
        return FileManager.deleteFile(path);
    }

    static loadTrips(onLoad:any = () => null): void {
        this.allTrips = [];
        FileManager.ensureDir("trips").then(() => {
            FileManager.readDirectoryFiles("trips").then(files => {
                files.forEach(file =>  {
                    if (!file.path.endsWith(".json")) return;
                    try {
                        trip.allTrips.push(trip.loadFromString(file.content));
                    } catch (err) {
                        Logger.error(err)
                    }
                })
                onLoad(this.allTrips);
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

        return newTrip;
    }

    static getTrip(id: string): trip | undefined{
        return this.allTrips.find(trp => trp.id == id);
    }
}
