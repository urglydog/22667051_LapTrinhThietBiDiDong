"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Animal = void 0;
// 9. Define an interface Animal with name and method sound().
class Animal {
    constructor(name) {
        this.name = name;
    }
    sound() {
        // phương thức của interface để rỗng để
        // lớp khác overide
        // console.log("gâu gâu");
    }
}
exports.Animal = Animal;
