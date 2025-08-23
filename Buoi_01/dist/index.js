"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bai_01_1 = require("./bai_01");
const bai_02_1 = require("./bai_02");
const bai_03_1 = require("./bai_03");
const bai_04_1 = require("./bai_04");
const bai_05_1 = require("./bai_05");
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
var acc = new bai_05_1.BankAccount(1000000000);
acc.deposit(200000000);
acc.withdraw(100000000);
