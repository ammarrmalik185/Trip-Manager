class log {
    id: string;
    title: string;
    description: string;
    location: string;
    distance_traveled: number;
    date: Date;

    constructor() {
        this.id = Math.random().toString(36);
        this.title = "";
        this.location = "";
        this.description = "";
        this.distance_traveled = 0;
        this.date = new Date();
    }
}

export default log;
