import { bookService } from "../services/book-service.js";

export default {
  template: `

 <section class="book-edit">
    <form @submit.prevent="save">
        <input type="text" placeholder="Author" v-model="carToEdit.vendor">
        <!-- <input type="text" placeholder="Categories" v-model.number="bookEdit.maxSpeed">
        <button>Save</button>     -->
    </form>
 </section>
`,
  data() {
    return {
      bookEdit: bookService.getEmptyBook(),
    };
  },
  methods: {
    save() {
      if (!this.bookEdit.authors) return;
      const car = bookService.save(this.bookEdit);
      this.$emit("saved", book);
      this.bookEdit = bookService.getEmptyBook();
    },
  },
  computed: {},
};
