// 10. Create a class Account with public, private and readonly fields.
export class Account {
  public user_name: string;
  #acount_number: number;
  readonly balance: number;

  constructor(user_name: string, acount_number: number, balance: number) {
    this.user_name = user_name;
    this.#acount_number = acount_number;
    this.balance = balance;
  }
}
