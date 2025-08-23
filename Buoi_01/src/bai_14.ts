// 14. Create a base class Employee. Extend Manager and Developer with specific methods.
export class Employee {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  getDetails() {
    return this.name;
  }
}
export class Manager extends Employee {
  department: string;
  constructor(department: string) {
    super(department);
    this.department = department;
  }
  manageDetail(): string {
    return this.department;
  }
}
export class Developer extends Employee {
  team: string;
  constructor(team: string) {
    super(team);
    this.team = team;
  }
  devDetail(): string {
    return this.team;
  }
}
