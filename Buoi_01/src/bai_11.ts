// 11. Create a base class Animal. Extend Dog and Cat classes with methods bark() and meow().
export class Animal {
  sound() {
    return "";
  }
}
export class Dog extends Animal {
  bark() {
    return "Gâu gâu";
  }
}
export class Cat extends Animal {
  meow() {
    return "Meo meo";
  }
}
