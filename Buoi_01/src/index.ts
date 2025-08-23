import { Person } from "./bai_01";
import { Student } from "./bai_02";
import { Car } from "./bai_03";
import { Rectangle } from "./bai_04";
import { BankAccount } from "./bai_05";
// Bài 01
var person = new Person("Nguyễn Chí Thiện", 20);
person.introduction();

//bài 02
var student = new Student("Nguyễn Chí Thiện", 20, 3.43);
student.disPlayInfo();

//bài 03
var car = new Car("Toyota", "K13", 2020);
car.disPlayInfo();

//bài 04
var rec = new Rectangle(3, 4);
rec.areaCaculate();
rec.perimeterCaculate();

//bài 05
var acc = new BankAccount(1000000000);
acc.deposit(200000000);
acc.withdraw(100000000);
