// 2. Write a class Student extending Person with an additional attribute grade. Add a method to
// display all info.
import { Person } from "./bai_01";
export class Student extends Person {
  "grade": number;
  constructor(name: string, age: number, grade: number) {
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
