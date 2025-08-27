"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stack = void 0;
// 22. Create a class Stack with push, pop, peek, isEmpty methods.
class Stack {
    constructor() {
        this.stacks = [];
    }
    push(item) {
        this.stacks.push(item);
    }
    pop() {
        return this.stacks.pop();
    }
    peek() {
        // xem phần tử trên cùng nhưng không xóa
        return this.stacks[this.stacks.length - 1];
    }
    isEmpty() {
        return this.stacks.length === 0;
    }
}
exports.Stack = Stack;
