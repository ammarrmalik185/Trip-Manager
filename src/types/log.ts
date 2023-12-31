class log {
    id: string;
    title: string;
    description: string;
    location: string;
    distance_traveled: number;
    date: Date;

    constructor(title: string, location: string, date: Date) {
        this.id = Math.random().toString(36);
        this.title = title;
        this.location = location;
        this.description = "";
        this.distance_traveled = 0;
        this.date = date;
    }
}

export default log;
