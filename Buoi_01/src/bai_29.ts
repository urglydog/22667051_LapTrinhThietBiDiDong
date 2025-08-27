// 29. Create an interface Movable with method move(). Implement it in Car and Robot.

export interface Movable {
  move(): void;
}

export class Car implements Movable {
  move(): void {
    console.log("Xe hơi đang chạy trên đường.");
  }
}

export class Robot implements Movable {
  move(): void {
    console.log("Robot đang di chuyển bằng bánh xe.");
  }
}
