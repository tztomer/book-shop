import bookPreview from "../cmps/book-preview.js";
import bookOnSale from "../cmps/book-on-sale.js";
export default {
  props: ["books"],
  template: `
 <section class="book-list">
        <ul>
            <li v-for="(book,idx) in books" :key="book.id" class="book-preview-container">
                <book-preview :book="book"/>
                <book-on-sale :book="book"></book-on-sale>
                <div class="actions">
                    <button @click="remove(book.id)">X</button>
                    <button @click="select(book)">Details</button>
                </div>
            </li>
        </ul>
    </section>
`,
  components: {
    bookPreview,
    bookOnSale,
  },

  data() {
    return {};
  },
  methods: {
    remove(bookId) {
      this.$emit("removed", bookId);
    },
    select(book) {
      this.$emit("selected", book);
    },
  },
  computed: {
    bookOnSale(book) {},
  },
};
