import member from "./member.ts";
import memberAmount from "./memberAmount.ts";

class expense {
    id: string;

    title: string;
    category: string;
    description: string;

    amount: number;
    date: Date;

    payers: memberAmount[];
    spenders: memberAmount[];

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

    calculate(): memberAmount[]{
        let totalWeight = this.spenders.reduce((currentValue, spender) => currentValue + spender.amount, 0);

        let result : memberAmount[] = this.spenders.map(spender => {
            return new memberAmount(spender.member, spender.amount / totalWeight * this.amount);
        })

        this.payers.forEach(payer => {
            let member = result.find(member => member.member === payer.member);
            if (member) {
                member.amount -= payer.amount;
            } else {
                result.push({
                    member: payer.member,
                    amount: -payer.amount
                })
            }
        });

        return result;

    }

    validate(): boolean {
        return this.payers.reduce((v, i) => v + i.amount, 0) != 0 &&
        this.spenders.reduce((v, i) => v + i.amount, 0) != 0;
    }

    calculateTotal(){
        this.amount = this.payers.reduce((v, i) => v + i.amount, 0);
    }

    getCalculatedExpense() : calculatedExpense{
        let totalWeight = this.spenders.reduce((currentValue, spender) => currentValue + spender.amount, 0);
        let value = {
            payers: this.payers,
            spenders: this.spenders.map((spend: memberAmount) => new memberAmount(spend.member, spend.amount * this.amount / totalWeight))
        }
        return value;
    }

}

export class calculatedExpense{
    payers: memberAmount[] = [];
    spenders: memberAmount[] = [];
}

export default expense;
