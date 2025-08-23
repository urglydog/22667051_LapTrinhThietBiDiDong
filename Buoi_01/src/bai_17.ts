// 17. Write a singleton Logger class that logs messages to console.
export class Logger {
  private static instance: Logger; // duy nhất một instance

  // ngăn không cho tạo mới từ bên ngoài
  private constructor() {}

  // tạo hoặc trả về instance duy nhất
  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  // phương thức duy nhất để log
  public log(message: string): void {
    console.log(`[LOG]: ${message}`);
  }
}
