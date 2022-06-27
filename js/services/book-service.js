import { utilService } from "./util-service.js";
import { storageService } from "../services/async-storage-service.js";
import booksArray from "../../books.json" assert { type: "json" };

const DB_BOOKS = "DB_BOOKS";
_createBooks();

export const bookService = {
  query,
  remove,
  save,
  get,
  getEmptyBook,
};

function _createBooks() {
  storageService.query(DB_BOOKS).then(books => {
    if (!books || !books.length) {
      books = booksArray;
      utilService.saveToStorage(DB_BOOKS, books);
    }
  });
}
function query() {
  return storageService.query(DB_BOOKS);
}
function remove(bookId) {
  return storageService.remove(DB_BOOKS, bookId);
}

function get(bookId) {
  return storageService.get(DB_BOOKS, bookId);
}

function save(book) {
  if (book.id) return storageService.put(DB_BOOKS, book);
  else return storageService.post(DB_BOOKS, book);
}

function getEmptyBook() {
  return {
    id: "",
    vendor: "",
    maxSpeed: 0,
  };
}
