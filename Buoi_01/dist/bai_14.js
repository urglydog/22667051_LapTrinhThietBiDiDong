"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Developer = exports.Manager = exports.Employee = void 0;
// 14. Create a base class Employee. Extend Manager and Developer with specific methods.
class Employee {
    constructor(name) {
        this.name = name;
    }
    getDetails() {
        return this.name;
    }
}
exports.Employee = Employee;
class Manager extends Employee {
    constructor(department) {
        super(department);
        this.department = department;
    }
    manageDetail() {
        return this.department;
    }
}
exports.Manager = Manager;
class Developer extends Employee {
    constructor(team) {
        super(team);
        this.team = team;
    }
    devDetail() {
        return this.team;
    }
}
exports.Developer = Developer;
