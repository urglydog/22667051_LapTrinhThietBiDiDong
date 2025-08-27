// 19. Demonstrate method overriding using polymorphism with Animal and subclasses.
export class Animal {
  speak(): string {
    return "Anime sound";
  }
}
export class Dog extends Animal {
  speak(): string {
    return "Gâu gâu";
  }
}
export class Cat extends Animal {
  speak(): string {
    return "Meo meo";
  }
}
