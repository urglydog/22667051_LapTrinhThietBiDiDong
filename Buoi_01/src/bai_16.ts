// 16. Create a generic class Box that can store any type of value.
export class Box<T> {
  value: T;
  constructor(value: T) {
    this.value = value;
  }
}
