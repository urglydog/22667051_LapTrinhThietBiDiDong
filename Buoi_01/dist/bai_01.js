"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Person = void 0;
// 1. Create a class Person with attributes name and age. Write a method to display this information.
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    // không cần dùng function
    introduction() {
        console.log("Bài 01");
        console.log("Name: ", this.name);
        console.log("Age: ", this.age);
    }
}
exports.Person = Person;
