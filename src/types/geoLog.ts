export class geoLog {
    id: string = "";
    date: Date = new Date();
    location: {lat:number, lng:number} = {lat:0, lng:0};
    constructor(date?: Date, latitude?: number, longitude?: number){
        this.id = Math.random().toString(36);
        this.date = date || this.date;
        this.location = {lat: latitude || 0, lng: longitude || 0};
    }
}
