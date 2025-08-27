// 22. Create a class Stack with push, pop, peek, isEmpty methods.
export class Stack<T> {
  private stacks: T[] = [];

  push(item: T): void {
    this.stacks.push(item);
  }

  pop(): T | undefined {
    return this.stacks.pop();
  }

  peek(): T | undefined {
    // xem phần tử trên cùng nhưng không xóa
    return this.stacks[this.stacks.length - 1];
  }

  isEmpty(): boolean {
    return this.stacks.length === 0;
  }
}
