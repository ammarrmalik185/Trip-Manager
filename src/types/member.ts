class member {
    id: string;
    name: string;
    description: string;
    email: string;
    phone: string;

    constructor() {
        this.id = Math.random().toString(36);
        this.name = "";
        this.description = "";
        this.email = "";
        this.phone = "";
    }
}

export default member;
