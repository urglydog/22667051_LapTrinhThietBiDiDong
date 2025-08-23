"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bai_01_1 = require("./bai_01");
const bai_02_1 = require("./bai_02");
const bai_03_1 = require("./bai_03");
const bai_04_1 = require("./bai_04");
const bai_05_1 = require("./bai_05");
// import { Book } from "./bai_06";
// import { User } from "./bai_07";
const bai_08_1 = require("./bai_08");
const bai_10_1 = require("./bai_10");
const bai_11_1 = require("./bai_11");
const bai_14_1 = require("./bai_14");
const bai_15_1 = require("./bai_15");
const bai_16_1 = require("./bai_16");
const bai_17_1 = require("./bai_17");
// Bài 01
var person = new bai_01_1.Person("Nguyễn Chí Thiện", 20);
person.introduction();
//bài 02
var student = new bai_02_1.Student("Nguyễn Chí Thiện", 20, 3.43);
student.disPlayInfo();
//bài 03
var car = new bai_03_1.Car("Toyota", "K13", 2020);
car.disPlayInfo();
//bài 04
var rec = new bai_04_1.Rectangle(3, 4);
rec.areaCaculate();
rec.perimeterCaculate();
//bài 05
var acc = new bai_05_1.BankAccount(10);
acc.deposit(2);
console.log(acc.balance);
acc.withdraw(5);
console.log(acc.balance);
//bài 06
var book = new bai_15_1.Book("Dế mèn phiêu lưu kí", "Nguyễn Nhật Ánh", 2004);
console.log(book);
//bài 07
var user = new bai_15_1.User("Nguyễn Chí Thiện");
console.log("Bài 07");
console.log(user.name);
user.name = "Nguyễn Chí Thành";
console.log(user.name);
//bài 08
console.log("Các sản phẩm có giá > 100:", bai_08_1.expensiveProducts);
//bài 09
// var anime = new Animal();
// ==> báo lỗi không thể tạo một đối tượng từ interface
//bài 10
var account = new bai_10_1.Account("NCT", 180304, 1000000000);
console.log(account.user_name);
// => lấy được do là public
// console.log(account.acount_number);
// //  => không lấy được do là private
// console.log(account.balance);
// account.balance += 10;
// ==>Cannot assign to 'balance'
// ==>because it is a read-only property.ts(2540)
//bài 11
console.log("Bài 11");
var dog = new bai_11_1.Dog();
console.log(dog.bark());
var cat = new bai_11_1.Cat();
console.log(cat.meow());
//bài 14
console.log("Bài 14");
const manager = new bai_14_1.Manager("Alice");
console.log(manager.getDetails()); // Employee: Alice, Salary: 5000
console.log(manager.manageDetail()); // Alice is managing the IT department.
const dev = new bai_14_1.Developer("Bob");
console.log(dev.getDetails()); // Employee: Bob, Salary: 4000
console.log(dev.devDetail()); // Bob is writing code in TypeScript.
//bài 15
console.log("Bài 15");
var book1 = new bai_15_1.Book("Dế mèn phiêu lưu kí");
var lib = new bai_15_1.Library();
lib.addBooks(book1);
console.log(lib.books);
//bài 16
console.log("Bài 16");
const numberBox = new bai_16_1.Box(123);
console.log(numberBox);
console.log(numberBox.value);
//bài 17
// --- Sử dụng ---
console.log("Bài 17");
const logger1 = bai_17_1.Logger.getInstance();
const logger2 = bai_17_1.Logger.getInstance();
logger1.log("Ứng dụng bắt đầu chạy...");
logger2.log("Thêm log khác...");
console.log(logger1 === logger2); // true -> chứng minh chỉ có 1 đối tượng
