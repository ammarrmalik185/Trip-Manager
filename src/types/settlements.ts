import member from "./member.ts";


export default class settlement {

    payer: member;
    spender: member;

    amount: number;

    constructor(payer: member, spender: member, amount: number) {
        this.payer = payer;
        this.spender = spender;
        this.amount = amount;
    }
}
