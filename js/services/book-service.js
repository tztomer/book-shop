import { utilService } from "./util-service.js";

import booksArray from "../../books.json" assert { type: "json" };

export const bookService = {
  getBooks,
  removedBook,
  getEmptyBook,
};

console.log(booksArray);
function getBooks() {
  return booksArray;
}

function removedBook(bookid) {
  const books = getBooks();
  const idx = books.findIndex(book => book.id === bookid);
  books.splice(idx, 1);
}

function getEmptyBook() {
  return { id: "", authors: "" };
}
