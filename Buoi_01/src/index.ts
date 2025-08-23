import { Person } from "./bai_01";
import { Student } from "./bai_02";
import { Car } from "./bai_03";
import { Rectangle } from "./bai_04";
import { BankAccount } from "./bai_05";
import { Book } from "./bai_06";
import { User } from "./bai_07";
import { expensiveProducts } from "./bai_08";
import { Animal } from "./bai_09";
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
var acc = new BankAccount(10);
acc.deposit(2);
acc.withdraw(5);

//bài 06
var book = new Book("Dế mèn phiêu lưu kí", "Nguyễn Nhật Ánh", 2004);
console.log(book);

//bài 07
var user = new User("Nguyễn Chí Thiện");
console.log("Bài 07");

console.log(user.name);
user.name = "Nguyễn Chí Thành";
console.log(user.name);

//bài 08
console.log("Các sản phẩm có giá > 100:", expensiveProducts);

//bài 09
var anime = new Animal("dfafa");
// ==> báo lỗi không thể tạo một đối tượng từ interface
