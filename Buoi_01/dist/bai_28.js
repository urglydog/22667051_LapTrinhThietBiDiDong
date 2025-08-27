"use strict";
// 28. Create a class Animal with protected method makeSound(). Extend Dog and Cat to override it.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cat = exports.Dog = exports.Animal = void 0;
class Animal {
    makeSound() {
        console.log("Động vật phát ra âm thanh.");
    }
    // public method để gọi từ ngoài
    speak() {
        this.makeSound();
    }
}
exports.Animal = Animal;
class Dog extends Animal {
    makeSound() {
        console.log("Gâu gâu!");
    }
}
exports.Dog = Dog;
class Cat extends Animal {
    makeSound() {
        console.log("Meo meo!");
    }
}
exports.Cat = Cat;
