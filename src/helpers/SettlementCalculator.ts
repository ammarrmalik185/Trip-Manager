import memberAmount from "../types/memberAmount.ts";
import member from "../types/member.ts";
import settlement from "../types/settlements.ts"
import {calculatedExpense} from "../types/expense.ts";
import offset from "../types/offset.ts";

export default class SettlementCalculator {
    expenses: calculatedExpense[];

    debtors: memberAmount[];
    creditors: memberAmount[];

    settlements: settlement[];
    offsets: memberAmount[];

    constructor(expenses: calculatedExpense[]) {
        this.expenses = expenses;

        this.debtors = [];
        this.creditors = [];

        this.settlements = [];
        this.offsets = [];

        this.calculateSettlements();

    }

    calculateSettlements() {

        let balances= new Map();

        let membersCache: Map<string, member> = new Map<string, member>();

        this.expenses.forEach(expense => {

            // Calculate net balance for each member
            expense.spenders.forEach(spender => {
                balances.set(spender.member.id, spender.amount + (balances.get(spender.member.id) || 0));
                membersCache.set(spender.member.id, spender.member)
            });

            expense.payers.forEach(payer => {
                balances.set(payer.member.id, (balances.get(payer.member.id) || 0) - payer.amount);
                membersCache.set(payer.member.id, payer.member)
            });
        })

        // Separate members into debtors and creditors
        this.debtors = []; this.creditors = []; this.offsets = [];
        balances.forEach((balance, member) => {
            member = membersCache.get(member);
            let oldOffset = this.offsets.find(mem => mem.member.id == member.id);
            if (!oldOffset) {
                oldOffset = new offset(member, 0);
                this.offsets.push(oldOffset);
            }
            oldOffset.amount += balance;

            if (balance > 0) {
                this.creditors.push(new memberAmount(member, balance));
            } else if (balance < 0) {
                this.debtors.push(new memberAmount(member, -balance));
            }

        });

        let creditors = this.creditors.map((a:any) => {return {...a}});
        let debtors = this.debtors.map((a:any) => {return {...a}});

        // Calculate settlements
        this.settlements = [];
        this.creditors.forEach(creditor => {
            while (creditor.amount > 0.9 && this.debtors.length > 0) {
                let debtor = this.debtors[0];

                if (debtor.member.id == creditor.member.id){
                    return;
                }

                let amount = Math.min(creditor.amount, debtor.amount);
                this.settlements.push(new settlement(debtor.member, creditor.member, amount));

                creditor.amount -= amount;
                debtor.amount -= amount;

                if (debtor.amount <= 0.9) {
                    this.debtors.shift();
                }
            }
        });

        this.creditors = creditors;
        this.debtors = debtors;
    }
}
