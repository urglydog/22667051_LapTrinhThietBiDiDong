"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Car = void 0;
// 3. Create a class Car with properties brand, model, year. Write a method to show car info.
class Car {
    constructor(brand, model, year) {
        this.brand = brand;
        this.model = model;
        this.year = year;
    }
    disPlayInfo() {
        console.log("Bài 03");
        console.log(this.brand);
        console.log(this.model);
        console.log(this.year);
    }
}
exports.Car = Car;
