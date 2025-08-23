// 9. Define an interface Animal with name and method sound().
export abstract class Animal {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  sound() {
    // phương thức của interface để rỗng để
    // lớp khác overide
    // console.log("gâu gâu");
  }
}
