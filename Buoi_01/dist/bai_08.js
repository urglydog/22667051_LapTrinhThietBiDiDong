"use strict";
// 8. Create a Product class with name, price. Create an array of products and filter products with
// price > 100.
Object.defineProperty(exports, "__esModule", { value: true });
exports.expensiveProducts = exports.Product = void 0;
class Product {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
}
exports.Product = Product;
// Tạo mảng sản phẩm
const products = [
    new Product("Bút", 20),
    new Product("Sách", 120),
    new Product("Vở", 80),
    new Product("Balo", 200),
    new Product("Thước", 50),
];
// Lọc sản phẩm có giá > 100
exports.expensiveProducts = products.filter((product) => product.price > 100);
