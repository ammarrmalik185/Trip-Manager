export class trip {
    id: string;
    title: string;
    destination: string;
    date: { from: string, to: string };

    members: member[];
    expenses: expense[];

    constructor(id: string, title: string, destination: string, date: { from: string, to: string }) {
        this.id = id;
        this.title = title;
        this.destination = destination;
        this.date = date;
        this.members = [];
        this.expenses = [];
    }
}
