"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Teacher = exports.Person = void 0;
// 27. Create a class Teacher that extends Person. Add subject attribute and introduce method.
// Lớp Person
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    introduce() {
        console.log(`Xin chào, tôi là ${this.name}, ${this.age} tuổi.`);
    }
}
exports.Person = Person;
// Lớp Teacher kế thừa Person
class Teacher extends Person {
    constructor(name, age, subject) {
        super(name, age);
        this.subject = subject;
    }
    // Override introduce()
    introduce() {
        console.log(`Xin chào, tôi là ${this.name}, ${this.age} tuổi. Tôi dạy môn ${this.subject}.`);
    }
}
exports.Teacher = Teacher;
