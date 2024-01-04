import member from "./member";

export default class memberAmount{
    member: member;
    amount: number;
    
    constructor(member: member, amount: number) {
        this.member = member;
        this.amount = amount;
    }
    
}