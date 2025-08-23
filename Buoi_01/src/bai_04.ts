// 4. Create a class Rectangle with width and height. Write a method to calculate area and perimeter.
export class Rectangle {
  "width": number;
  "height": number;

  constructor(width: number, height: number) {
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
