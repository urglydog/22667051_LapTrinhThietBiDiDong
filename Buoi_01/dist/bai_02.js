"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
// 2. Write a class Student extending Person with an additional attribute grade. Add a method to
// display all info.
const bai_01_1 = require("./bai_01");
class Student extends bai_01_1.Person {
    constructor(name, age, grade) {
        super(name, age);
        this.name;
        this.age;
        this.grade = grade;
    }
    disPlayInfo() {
        console.log("Bài 02");
        console.log(this.name);
        console.log(this.age);
        console.log(this.grade);
    }
}
exports.Student = Student;
