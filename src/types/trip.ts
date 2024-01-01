import expense from "./expense.ts";
import log from "./log.ts";
import member from "./member.ts";

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
        { id: '1', title: "Honeymoon", description: "",destination: 'Paris', date: {from: new Date(), to: new Date()},expenses: [],logs: [],members: []},
        { id: '2', title: "Test", description: "", destination: 'New York', date: {from: new Date(), to: new Date()}, members: [], expenses: [], logs: [] },
        { id: '3', title: "Test 2", description: "",destination: 'Tokyo', date: {from: new Date(), to: new Date()}, members: [], expenses: [] , logs: []},
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
}
