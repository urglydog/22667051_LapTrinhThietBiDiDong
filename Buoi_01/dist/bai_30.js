"use strict";
// 30. Create a class School with list of Students and Teachers. Add method to display info.
Object.defineProperty(exports, "__esModule", { value: true });
exports.School = exports.Student = void 0;
const bai_27_1 = require("./bai_27"); // Person đã có trong bài 27
// Student kế thừa Person
class Student extends bai_27_1.Person {
    constructor(name, age, grade) {
        super(name, age);
        this.grade = grade;
    }
    introduce() {
        console.log(`Xin chào, tôi là ${this.name}, ${this.age} tuổi. Tôi học lớp ${this.grade}.`);
    }
}
exports.Student = Student;
class School {
    constructor() {
        this.students = [];
        this.teachers = [];
    }
    addStudent(student) {
        this.students.push(student);
    }
    addTeacher(teacher) {
        this.teachers.push(teacher);
    }
    displayInfo() {
        console.log("=== Danh sách Giáo viên ===");
        this.teachers.forEach((t) => t.introduce());
        console.log("=== Danh sách Học sinh ===");
        this.students.forEach((s) => s.introduce());
    }
}
exports.School = School;
