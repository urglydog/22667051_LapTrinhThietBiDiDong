"use strict";
// 23. Create an interface Payment with method pay(amount).
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardPayment = exports.CashPayment = void 0;
class CashPayment {
    pay(amount) {
        console.log(`Thanh toán ${amount} bằng tiền mặt.`);
    }
}
exports.CashPayment = CashPayment;
class CardPayment {
    pay(amount) {
        console.log(`Thanh toán ${amount} bằng thẻ.`);
    }
}
exports.CardPayment = CardPayment;
