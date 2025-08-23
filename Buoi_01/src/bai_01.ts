// 1. Create a class Person with attributes name and age. Write a method to display this information.
export class Person {
  "name": string;
  "age": number;
  constructor(name: string, age: number) {
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
