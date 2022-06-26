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
      books: bookService.getBooks(),
      selectedBook: null,
      filterBy: null,
    };
  },
  methods: {
    filterBook(filterBy) {
      this.filterBy = filterBy;
    },
    selectBook(book) {
      this.selectedBook = book;
    },
    removeBook(bookid) {
      bookService.removedBook(bookid);
      const idx = this.books.findIndex(book => book.id === bookid);
      this.books.splice(idx, 1);
      console.log(this.books.splice(idx, 1));
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
