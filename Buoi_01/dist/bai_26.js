"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = exports.Product = void 0;
// 26. Create a class Order with list of products. Add method to calculate total price.
class Product {
    constructor(name, quantity, price) {
        this.name = name;
        this.price = price;
    }
}
exports.Product = Product;
class Order {
    constructor() {
        this.products = [];
    }
    addProduct(product) {
        this.products.push(product);
    }
    totalPrice() {
        return this.products.reduce((sum, p) => sum + p.price, 0);
    }
}
exports.Order = Order;
