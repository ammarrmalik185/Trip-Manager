import expense from "./expense.ts";
import member from "./member.ts";

export default class settlement{
    member: member;
    amount: number;
    
    expenseSettlements: {expense: expense, amountDue: number}[];
    
    constructor(member: member, amount: number) {
        this.member = member;
        this.amount = amount;
        this.expenseSettlements = [];
    }
    
    addExpense(newExpense: expense, amountDue: number){
        if (amountDue == 0) return;
        this.expenseSettlements.push({expense: newExpense, amountDue: amountDue})
        this.amount += amountDue;
    }
}