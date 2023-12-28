

class expense {
    id: string;

    title: string;
    category: string;
    description: string;

    amount: number;
    date: string;

    paidBy: [{payer: member, amount: number}];
    spenders: [{spender: member, weight: number}];

    constructor(id: string, title: string, category: string, description: string, amount: number, date: string, paidBy: [{payer: member, amount: number}], spenders: [{spender: member, weight: number}]) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.description = description;
        this.amount = amount;
        this.date = date;
        this.paidBy = paidBy;
        this.spenders = spenders;
    }
}
