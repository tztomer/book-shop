import { bookService } from "../services/book-service.js";

import bookList from "../cmps/book-list.js";
import bookFilter from "../cmps/book-filter.js";
import bookDetails from "./details.js";

export default {
  template: `
  <section class="book-app">
    <h1>books:</h1>
    <book-filter @filtered="filterBook"/>
    <book-list @removed="removeBook" @selected="selectBook" :books="booksToDisplay"/>
    <book-details v-if="selectedBook" @close="selectedBook = null" :book="selectedBook" />

  </section>
`,
  components: {
    bookList,
    bookDetails,
    bookFilter,
  },
  data() {
    return {
      books: null,
      selectedBook: null,
      filterBy: null,
    };
  },
  created() {
    return bookService.query().then(books => {
      this.books = books;
    });
  },
  methods: {
    filterBook(filterBy) {
      this.filterBy = filterBy;
    },
    selectBook(book) {
      this.selectedBook = book;
    },
    removeBook(bookid) {
      bookService.remove(bookid).then(() => {
        const idx = this.books.findIndex(book => book.id === bookid);
        this.books.splice(idx, 1);
        console.log("Book Deleted");
      });
    },
  },
  computed: {
    booksToDisplay() {
      if (!this.filterBy) return this.books;
      const regex = new RegExp(this.filterBy.authors, "i");
      return this.books.filter(book => regex.test(book.authors));
    },
  },
};
