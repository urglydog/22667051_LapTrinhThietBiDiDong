"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
// 17. Write a singleton Logger class that logs messages to console.
class Logger {
    // ngăn không cho tạo mới từ bên ngoài
    constructor() { }
    // tạo hoặc trả về instance duy nhất
    static getInstance() {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }
    // phương thức duy nhất để log
    log(message) {
        console.log(`[LOG]: ${message}`);
    }
}
exports.Logger = Logger;
