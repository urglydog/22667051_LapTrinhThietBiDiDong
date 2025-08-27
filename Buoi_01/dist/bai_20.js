"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bike = exports.Car = void 0;
class Car {
    constructor(brand) {
        this.brand = brand;
    }
    move() {
        return `${this.brand} car is driving`;
    }
}
exports.Car = Car;
class Bike {
    constructor(brand) {
        this.brand = brand;
    }
    move() {
        return `${this.brand} bike is cycling`;
    }
}
exports.Bike = Bike;
