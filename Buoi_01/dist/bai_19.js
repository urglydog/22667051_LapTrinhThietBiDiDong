"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cat = exports.Dog = exports.Animal = void 0;
// 19. Demonstrate method overriding using polymorphism with Animal and subclasses.
class Animal {
    speak() {
        return "Anime sound";
    }
}
exports.Animal = Animal;
class Dog extends Animal {
    speak() {
        return "Gâu gâu";
    }
}
exports.Dog = Dog;
class Cat extends Animal {
    speak() {
        return "Meo meo";
    }
}
exports.Cat = Cat;
