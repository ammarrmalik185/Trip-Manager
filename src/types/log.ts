class log {
    id: string;
    title: string;
    description: string;
    location: string;
    distance_traveled: number;
    geoLocation: { lat: number, lng: number } | undefined;
    date: Date;

    constructor() {
        this.id = Math.random().toString(36);
        this.title = "";
        this.location = "";
        this.description = "";
        this.distance_traveled = 0;
        this.date = new Date();
        this.geoLocation = undefined;
    }

    validate(): boolean {
        return this.title != "";
    }

    getValidationError(): string {
        if (this.title == "") {
            return "Title cannot be empty";
        }
        return "Log details are not valid"
    }
}

export default log;
