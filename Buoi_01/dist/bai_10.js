"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _Account_acount_number;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
// 10. Create a class Account with public, private and readonly fields.
class Account {
    constructor(user_name, acount_number, balance) {
        _Account_acount_number.set(this, void 0);
        this.user_name = user_name;
        __classPrivateFieldSet(this, _Account_acount_number, acount_number, "f");
        this.balance = balance;
    }
}
exports.Account = Account;
_Account_acount_number = new WeakMap();
