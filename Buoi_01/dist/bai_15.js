"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Library = exports.Book = exports.User = void 0;
// 15. Create a Library class that can store Book and User objects. Add method to add books.
class User {
    constructor(name) {
        this.name = name;
    }
}
exports.User = User;
class Book {
    constructor(name) {
        this.name = name;
    }
}
exports.Book = Book;
class Library {
    constructor() {
        this.books = [];
        this.users = [];
    }
    addBooks(book) {
        return this.books.push(book);
    }
}
exports.Library = Library;
