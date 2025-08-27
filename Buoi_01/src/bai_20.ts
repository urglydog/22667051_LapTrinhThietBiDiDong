// 20. Write a Vehicle interface and implement it in Car and Bike classes.
interface Vehicle {
  brand: string;
  move(): string;
}
export class Car implements Vehicle {
  brand: string;
  constructor(brand: string) {
    this.brand = brand;
  }
  move(): string {
    return `${this.brand} car is driving`;
  }
}
export class Bike implements Vehicle {
  brand: string;
  constructor(brand: string) {
    this.brand = brand;
  }
  move(): string {
    return `${this.brand} bike is cycling`;
  }
}
