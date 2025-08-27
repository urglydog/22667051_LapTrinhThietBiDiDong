// 23. Create an interface Payment with method pay(amount).

export interface Payment {
  pay(amount: number): void;
}

export class CashPayment implements Payment {
  pay(amount: number): void {
    console.log(`Thanh toán ${amount} bằng tiền mặt.`);
  }
}

export class CardPayment implements Payment {
  pay(amount: number): void {
    console.log(`Thanh toán ${amount} bằng thẻ.`);
  }
}
