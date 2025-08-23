"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankAccount = void 0;
// 5. Create a class BankAccount with balance. Add methods deposit() and withdraw().
class BankAccount {
    constructor(balance) {
        this.balance = balance;
    }
    deposit(amount) {
        console.log("Câu 05");
        console.log("Account has :", this.balance);
        console.log("You just deposit :", amount);
        console.log("Account has after that ", this.balance + amount);
    }
    withdraw(amount) {
        console.log("Account has :", this.balance);
        console.log("You just deposit :", amount);
        console.log("Account has after that ", this.balance - amount);
    }
}
exports.BankAccount = BankAccount;
