// 28. Create a class Animal with protected method makeSound(). Extend Dog and Cat to override it.

export class Animal {
  protected makeSound(): void {
    console.log("Động vật phát ra âm thanh.");
  }

  // public method để gọi từ ngoài
  public speak(): void {
    this.makeSound();
  }
}

export class Dog extends Animal {
  protected override makeSound(): void {
    console.log("Gâu gâu!");
  }
}

export class Cat extends Animal {
  protected override makeSound(): void {
    console.log("Meo meo!");
  }
}
