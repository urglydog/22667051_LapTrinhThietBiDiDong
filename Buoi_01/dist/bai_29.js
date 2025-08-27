"use strict";
// 29. Create an interface Movable with method move(). Implement it in Car and Robot.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Robot = exports.Car = void 0;
class Car {
    move() {
        console.log("Xe hơi đang chạy trên đường.");
    }
}
exports.Car = Car;
class Robot {
    move() {
        console.log("Robot đang di chuyển bằng bánh xe.");
    }
}
exports.Robot = Robot;
