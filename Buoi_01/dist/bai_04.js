"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rectangle = void 0;
// 4. Create a class Rectangle with width and height. Write a method to calculate area and perimeter.
class Rectangle {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    areaCaculate() {
        console.log("Bài 04");
        console.log("Rectangle area is", (this.width + this.height) * 2);
    }
    perimeterCaculate() {
        console.log("Rectangle perimeter is", this.width * this.height);
    }
}
exports.Rectangle = Rectangle;
