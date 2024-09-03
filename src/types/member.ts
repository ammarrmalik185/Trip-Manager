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

    validate(){
        return this.name != "";
    }

    getValidationError(){
        if (this.name == "") {
            return "Name cannot be empty";
        }
        return "Member details are not valid"
    }
}

export default member;
