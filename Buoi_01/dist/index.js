"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { Person } from "./bai_01";
// import { Student } from "./bai_02";
// import { Car } from "./bai_03";
// import { Rectangle } from "./bai_04";
// import { BankAccount } from "./bai_05";
// import { Book } from "./bai_06";
// import { User } from "./bai_07";
// import { expensiveProducts } from "./bai_08";
// import { Animal } from "./bai_09";
// import { Account } from "./bai_10";
// import { Dog, Cat } from "./bai_11";
// import { Employee, Manager, Developer } from "./bai_14";
// import { User, Book, Library } from "./bai_15";
// import { Box } from "./bai_16";
// import { Logger } from "./bai_17";
// import { MathUtil } from "./bai_18";
// import { Animal, Dog, Cat } from "./bai_19";
// import { Car, Bike } from "./bai_20";
// import { Repository } from "./bai_21";
// import { Stack } from "./bai_22";
const bai_23_1 = require("./bai_23");
// Bài 01
// var person = new Person("Nguyễn Chí Thiện", 20);
// person.introduction();
// //bài 02
// var student = new Student("Nguyễn Chí Thiện", 20, 3.43);
// student.disPlayInfo();
// //bài 03
// var car = new Car("Toyota", "K13", 2020);
// car.disPlayInfo();
// //bài 04
// var rec = new Rectangle(3, 4);
// rec.areaCaculate();
// rec.perimeterCaculate();
// //bài 05
// var acc = new BankAccount(10);
// acc.deposit(2);
// console.log(acc.balance);
// acc.withdraw(5);
// console.log(acc.balance);
//bài 06
// var book = new Book("Dế mèn phiêu lưu kí", "Nguyễn Nhật Ánh", 2004);
// console.log(book);
//bài 07
// var user = new User("Nguyễn Chí Thiện");
// console.log("Bài 07");
// console.log(user.name);
// user.name = "Nguyễn Chí Thành";
// console.log(user.name);
// //bài 08
// console.log("Các sản phẩm có giá > 100:", expensiveProducts);
//bài 09
// var anime = new Animal();
// ==> báo lỗi không thể tạo một đối tượng từ interface
//bài 10
// var account = new Account("NCT", 180304, 1000000000);
// console.log(account.user_name);
// => lấy được do là public
// console.log(account.acount_number);
// //  => không lấy được do là private
// console.log(account.balance);
// account.balance += 10;
// ==>Cannot assign to 'balance'
// ==>because it is a read-only property.ts(2540)
//bài 11
// console.log("Bài 11");
// var dog = new Dog();
// console.log(dog.bark());
// var cat = new Cat();
// console.log(cat.meow());
//bài 14
// console.log("Bài 14");
// const manager = new Manager("Alice");
// console.log(manager.getDetails()); // Employee: Alice, Salary: 5000
// console.log(manager.manageDetail()); // Alice is managing the IT department.
// const dev = new Developer("Bob");
// console.log(dev.getDetails()); // Employee: Bob, Salary: 4000
// console.log(dev.devDetail()); // Bob is writing code in TypeScript.
// //bài 15
// console.log("Bài 15");
// var book1 = new Book("Dế mèn phiêu lưu kí");
// var lib = new Library();
// lib.addBooks(book1);
// console.log(lib.books);
// //bài 16
// console.log("Bài 16");
// const numberBox = new Box<number>(123);
// console.log(numberBox);
// console.log(numberBox.value);
// //bài 17
// // --- Sử dụng ---
// console.log("Bài 17");
// const logger1 = Logger.getInstance();
// const logger2 = Logger.getInstance();
// logger1.log("Ứng dụng bắt đầu chạy...");
// logger2.log("Thêm log khác...");
// console.log(logger1 === logger2); // true -> chứng minh chỉ có 1 đối tượng
// //bài 18
// console.log("Bài 18");
// console.log(MathUtil.add(5, 3)); // 8
// console.log(MathUtil.subtract(5, 3)); // 2
// console.log(MathUtil.multiply(5, 3)); // 15
// console.log(MathUtil.divide(10, 2)); // 5
// bài 19
// console.log("Bài 19");
// const animals: Animal[] = [new Dog(), new Cat(), new Animal()];
// animals.forEach((animal) => {
//   console.log(animal.speak());
// });
// bài 20
// console.log("Bài 20");
// var car = new Car("Toyota");
// var bike = new Bike("Honda");
// console.log(car.move());
// console.log(bike.move());
// bài 21
// console.log("Bài 21");
// const digitRepo = new Repository<number>();
// digitRepo.add(1);
// digitRepo.add(2);
// console.log("Digit repository:", digitRepo.getAll());
// const strRepo = new Repository<string>();
// strRepo.add("a");
// strRepo.add("b");
// console.log("String repository:", strRepo.getAll());
//bài 22
// console.log("Bài 22");
// console.log("=== Test Stack<number> ===");
// const numStack = new Stack<number>();
// // Test isEmpty trên stack rỗng
// console.log(numStack.isEmpty()); // true
// // Push số
// numStack.push(10);
// numStack.push(20);
// numStack.push(30);
// console.log(numStack.peek()); // 30 (top)
// // Pop số
// console.log(numStack.pop()); // 30
// console.log(numStack.peek()); // 20
// console.log(numStack.isEmpty()); // false
// // Pop hết
// numStack.pop(); // 20
// numStack.pop(); // 10
// console.log(numStack.pop()); // undefined (stack rỗng)
// console.log(numStack.isEmpty()); // true
// console.log("=== Test Stack<string> ===");
// const strStack = new Stack<string>();
// // Test isEmpty trên stack rỗng
// console.log(strStack.isEmpty()); // true
// // Push chuỗi
// strStack.push("apple");
// strStack.push("banana");
// strStack.push("cherry");
// console.log(strStack.peek()); // "cherry"
// // Pop chuỗi
// console.log(strStack.pop()); // "cherry"
// console.log(strStack.peek()); // "banana"
// console.log(strStack.isEmpty()); // false
// // Pop hết
// strStack.pop(); // "banana"
// strStack.pop(); // "apple"
// console.log(strStack.pop()); // undefined (stack rỗng)
// console.log(strStack.isEmpty()); // true
console.log("Bài 23");
const cash = new bai_23_1.CashPayment();
cash.pay(100000); // Thanh toán 100000 bằng tiền mặt.
const card = new bai_23_1.CardPayment();
card.pay(250000); // Thanh toán 250000 bằng thẻ.
