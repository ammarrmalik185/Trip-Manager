import {calculatedExpense} from "./expense.ts";
import member from "./member.ts";
import {DocumentDirectoryPath, mkdir, readDir, readFile, unlink, writeFile} from "react-native-fs";
import {Logger} from "../helpers/Logger.ts";
import memberAmount from "./memberAmount.ts";

export class singleExpense {

    id: string;

    title: string;
    category: string;
    description: string;

    amount: number;
    date: Date;

    payers: memberAmount[];
    spenders: memberAmount[];

    members: member[];

    static allSingleExpenses: singleExpense[] = [];

    constructor(){
        this.id = Math.random().toString(36);
        this.title = "";
        this.category = "";
        this.description = "";
        this.amount = 0;
        this.date = new Date();
        this.payers = [];
        this.spenders = [];
        this.members = [];
    }

    saveSingleExpense(): Promise<void>{
        let path = DocumentDirectoryPath + "/singleExpenses/" + this.id + '.json';
        let thisdata = JSON.stringify({
            id: this.id,
            title: this.title,
            description: this.description,
            date: this.date,
            category: this.category,
            payers: this.payers,
            spenders: this.spenders,
            members: this.members,
        });

        Logger.log("Saving Expense: " + thisdata)

        return new Promise<void>((resolve, reject) => {
            writeFile(path, thisdata, 'utf8').then((success) => {
                resolve();
            }).catch(() => {
                reject();
            });
        });
    }

    getMember(id: string): member | undefined{
        return this.members.find(mem => mem.id == id);
    }

    deleteSingleExpense(): Promise<void>{
        let path = DocumentDirectoryPath + "/singleExpenses/" + this.id + '.json';
        singleExpense.allSingleExpenses.filter(item => item.id != this.id);
        return unlink(path);
    }

    static loadSingleExpenses(onLoad:any = () => null): void {
        this.allSingleExpenses = [];
        singleExpense.createFolder().then(() => {
            readDir(DocumentDirectoryPath + "/singleExpenses").then(result => {
                let pending = 0;
                if (result.length <= 0) onLoad([])
                result.forEach(item => {
                    if (item.isFile() && item.path.endsWith(".json")){
                        pending += 1;
                        readFile(item.path).then(result => {
                            Logger.log(item.path + ":" + result);
                            try {
                                singleExpense.allSingleExpenses.push(singleExpense.loadFromString(result));
                                pending -= 1;
                                if (pending == 0) onLoad(singleExpense.allSingleExpenses);
                            } catch (err){
                                pending -= 1;
                                if (pending == 0) onLoad(singleExpense.allSingleExpenses);
                                Logger.error(err)
                            }

                        }).catch((err) => {
                            pending -= 1;
                            if (pending == 0) onLoad(singleExpense.allSingleExpenses);
                            Logger.error(err)
                        })
                    }
                })
            })
        });
    }

    static loadFromString(content: string) : singleExpense{
        let data = JSON.parse(content);
        let newSingleExpense = new singleExpense();
        newSingleExpense.id = data.id;
        newSingleExpense.title = data.title;
        newSingleExpense.description = data.description;
        newSingleExpense.category = data.category;
        newSingleExpense.date = new Date(data.date)
        newSingleExpense.members = [];
        newSingleExpense.payers = data.payers;
        newSingleExpense.spenders = data.spenders;

        data.members.forEach((item: any) => {
            let newMember = new member();
            newMember.id = item.id;
            newMember.name = item.name;
            newSingleExpense.members.push(newMember);
        })

        return newSingleExpense;
    }

    static getTrip(id: string): singleExpense | undefined{
        return this.allSingleExpenses.find(trp => trp.id == id);
    }

    static createFolder(): Promise<void>{
        return mkdir(DocumentDirectoryPath + "/singleExpenses/");
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
            this.spenders.reduce((v, i) => v + i.amount, 0) != 0 &&
            this.title != "";
    }

    getValidationError(): string {
        if (this.payers.reduce((v, i) => v + i.amount, 0) == 0) {
            return "Payers total amount cannot be 0";
        }
        if (this.spenders.reduce((v, i) => v + i.amount, 0) == 0) {
            return "Spenders total amount cannot be 0";
        }
        if (this.title == "") {
            return "Title cannot be empty";
        }
        return "Expense details are not valid";
    }

    calculateTotal(){
        this.amount = this.payers.reduce((v, i) => v + i.amount, 0);
    }

    getCalculatedExpense() : calculatedExpense{
        this.calculateTotal();
        let totalWeight = this.spenders.reduce((currentValue, spender) => currentValue + spender.amount, 0);
        return {
            payers: this.payers,
            spenders: this.spenders.map((spend: memberAmount) => new memberAmount(spend.member, spend.amount * this.amount / totalWeight))
        };
    }

}
