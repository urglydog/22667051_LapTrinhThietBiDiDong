// 27. Create a class Teacher that extends Person. Add subject attribute and introduce method.
// Lớp Person
export class Person {
  constructor(public name: string, public age: number) {}

  introduce(): void {
    console.log(`Xin chào, tôi là ${this.name}, ${this.age} tuổi.`);
  }
}

// Lớp Teacher kế thừa Person
export class Teacher extends Person {
  constructor(name: string, age: number, public subject: string) {
    super(name, age);
  }

  // Override introduce()
  override introduce(): void {
    console.log(
      `Xin chào, tôi là ${this.name}, ${this.age} tuổi. Tôi dạy môn ${this.subject}.`
    );
  }
}
