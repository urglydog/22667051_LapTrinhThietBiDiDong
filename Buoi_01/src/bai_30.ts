// 30. Create a class School with list of Students and Teachers. Add method to display info.

import { Teacher } from "./bai_27"; // reuse bài 27
import { Person } from "./bai_27"; // Person đã có trong bài 27

// Student kế thừa Person
export class Student extends Person {
  constructor(name: string, age: number, public grade: number) {
    super(name, age);
  }

  override introduce(): void {
    console.log(
      `Xin chào, tôi là ${this.name}, ${this.age} tuổi. Tôi học lớp ${this.grade}.`
    );
  }
}

export class School {
  private students: Student[] = [];
  private teachers: Teacher[] = [];

  addStudent(student: Student): void {
    this.students.push(student);
  }

  addTeacher(teacher: Teacher): void {
    this.teachers.push(teacher);
  }

  displayInfo(): void {
    console.log("=== Danh sách Giáo viên ===");
    this.teachers.forEach((t) => t.introduce());

    console.log("=== Danh sách Học sinh ===");
    this.students.forEach((s) => s.introduce());
  }
}
