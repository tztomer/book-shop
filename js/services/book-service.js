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
  addReview,
  getEmptyReview,
  removeReview,
  // postMany,
  // getEmptyBook,
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

function addReview(bookId, review) {
  return get(bookId).then(book => {
    review.id = utilService.makeId();
    if (!book.reviews) {
      book.reviews = [];
      book.reviews.push(review);
      return storageService.put(DB_BOOKS, book);
    } else {
      book.reviews.push(review);
      return storageService.put(DB_BOOKS, book);
    }
  });
}

function removeReview(bookId, reviewId) {
  return get(bookId).then(book => {
    const idx = book.reviews.findIndex(review => review.id === reviewId);
    book.reviews.splice(idx, 1);
    return storageService.put(DB_BOOKS, book);
  });
}

function getEmptyReview() {
  return {
    rederName: "",
    rate: "",
    readingDate: "",
    bookReview: "",
  };
}
