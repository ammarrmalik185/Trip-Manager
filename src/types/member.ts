class member {
    id: string;
    name: string;

    constructor(name: string) {
        this.id = Math.random().toString(36);
        this.name = name;
    }
}

export default member;
