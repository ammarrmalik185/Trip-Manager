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
        { id: '1', title: "Honeymoon", description: "",destination: 'Paris', date: {from: new Date(), to: new Date()},
            expenses: [new expense("Test", "Misc", 1000, new Date(), [], [])],
            logs: [new log("temp", "Test", new Date()), new log("temp 2", "Test 3", new Date())],
            members: [new member("Test"), new member("Test 2")]
        },
        { id: '2', title: "Test", description: "", destination: 'New York', date: {from: new Date(), to: new Date()}, members: [], expenses: [], logs: [new log("temp", "Test", new Date())] },
        { id: '3', title: "Test 2", description: "",destination: 'Tokyo', date: {from: new Date(), to: new Date()}, members: [], expenses: [] , logs: [new log("temp", "Test", new Date())]},
    ];

    constructor(){
        this.id = "";
        this.title = "";
        this.description = "";
        this.destination = "";
        this.date = { from: new Date(), to: new Date() };
        this.members = [];
        this.expenses = [];
        this.logs = [];
    }
}
