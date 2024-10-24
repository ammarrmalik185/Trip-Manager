export class Utils{

    static validNumberRegex = /^(\d+(\.\d*)?|\.\d+)?$/;

    static getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
        let R = 6371; // Radius of the earth in km
        let dLat = this.deg2rad(lat2 - lat1);  // deg2rad below
        let dLon = this.deg2rad(lon2 - lon1);
        let a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distance in km
    }

    static deg2rad(deg: number) {
        return deg * (Math.PI / 180)
    }

    static precisionRound(number: number, precision: number) {
        let factor = Math.pow(10, precision);
        return Math.round(number * factor) / factor;
    }
}
