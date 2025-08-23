"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cat = exports.Dog = exports.Animal = void 0;
// 11. Create a base class Animal. Extend Dog and Cat classes with methods bark() and meow().
class Animal {
    sound() {
        return "";
    }
}
exports.Animal = Animal;
class Dog extends Animal {
    bark() {
        return "Gâu gâu";
    }
}
exports.Dog = Dog;
class Cat extends Animal {
    meow() {
        return "Meo meo";
    }
}
exports.Cat = Cat;
