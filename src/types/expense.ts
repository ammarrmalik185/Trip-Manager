import member from "./member.ts";

class expense {
    id: string;

    title: string;
    category: string;
    description: string;

    amount: number;
    date: Date;

    payers: {payer: member, amount: number}[];
    spenders: {spender: member, weight: number}[];

    constructor() {
        this.id = Math.random().toString(36);
        this.title = "";
        this.category = "";
        this.description = "";
        this.amount = 0;
        this.date = new Date();
        this.payers = [];
        this.spenders = [];
    }

    calculate(): {member: member, amount: number}[]{
        let totalWeight = this.spenders.reduce((currentValue, spender) => currentValue + spender.weight, 0);

        let result : {member: member, amount: number}[] = this.spenders.map(spender => {
            return {
                member: spender.spender,
                amount: spender.weight / totalWeight * this.amount
            }
        })

        this.payers.forEach(payer => {
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
        return this.payers.reduce((v, i) => v + i.amount, 0) == this.amount;
    }

}

export default expense;
