class member {
    id: string;
    name: string;

    constructor() {
        this.id = Math.random().toString(36);
        this.name = "";
    }
}

export default member;
