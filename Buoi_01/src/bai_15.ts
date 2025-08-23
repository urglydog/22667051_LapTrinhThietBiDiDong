// 15. Create a Library class that can store Book and User objects. Add method to add books.
export class User {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}
export class Book {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}
export class Library {
  users: User[];
  books: Book[];
  constructor() {
    this.books = [];
    this.users = [];
  }
  addBooks(book: Book) {
    return this.books.push(book);
  }
}
