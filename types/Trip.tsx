export class trip {
    id: string;
    title: string;
    destination: string;
    date: { from: string, to: string };

    constructor(id: string, title: string, destination: string, date: { from: string, to: string }) {
        this.id = id;
        this.title = title;
        this.destination = destination;
        this.date = date;
    }
}
