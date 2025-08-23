// 5. Create a class BankAccount with balance. Add methods deposit() and withdraw().
export class BankAccount {
  "balance": number;
  constructor(balance: number) {
    this.balance = balance;
  }

  deposit(amount: number) {
    console.log("Câu 05");

    console.log("Account has :", this.balance);
    console.log("You just deposit :", amount);
    console.log("Account has after that ", this.balance + amount);
  }
  withdraw(amount: number) {
    console.log("Account has :", this.balance);
    console.log("You just deposit :", amount);
    console.log("Account has after that ", this.balance - amount);
  }
}
