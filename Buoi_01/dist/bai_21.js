"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Repository = void 0;
// 21. Create a generic Repository class with methods add(), getAll().
class Repository {
    constructor() {
        this.items = [];
    }
    add(item) {
        this.items.push(item);
    }
    getAll() {
        return this.items;
    }
}
exports.Repository = Repository;
