import member from "./member.ts";

class expense {
    id: string;

    title: string;
    category: string;
    description: string;

    amount: number;
    date: Date;

    paidBy: {payer: member, amount: number}[];
    spenders: {spender: member, weight: number}[];

    constructor(title: string, category: string, amount: number, date: Date, paidBy: {payer: member, amount: number}[], spenders: {spender: member, weight: number}[]) {
        this.id = Math.random().toString(36);
        this.title = title;
        this.category = category;
        this.description = "";
        this.amount = amount;
        this.date = date;
        this.paidBy = paidBy;
        this.spenders = spenders;
    }

    calculate(): {member: member, amount: number}[]{
        let totalWeight = this.spenders.reduce((currentValue, spender) => currentValue + spender.weight, 0);

        let result : {member: member, amount: number}[] = this.spenders.map(spender => {
            return {
                member: spender.spender,
                amount: spender.weight / totalWeight * this.amount
            }
        })

        this.paidBy.forEach(payer => {
            let member = result.find(member => member.member === payer.payer);
            if (member) {
                member.amount -= payer.amount;
            } else {
                result.push({
                    member: payer.payer,
                    amount: -payer.amount
                })
            }
        });

        return result;

    }

    validate(): boolean {
        return true;
    }

}

export default expense;
