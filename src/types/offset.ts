import expense from "./expense.ts";
import member from "./member.ts";

export default class offset {
    member: member;
    amount: number;
    
    expenseSettlements: {expense: expense, amountDue: number}[];
    
    constructor(member: member, amount: number) {
        this.member = member;
        this.amount = amount;
        this.expenseSettlements = [];
    }

}