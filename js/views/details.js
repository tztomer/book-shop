import { bookService } from "../services/book-service.js";

import bookReview from "../views/review-add.cmp.js";

export default {
  template: `
    <section v-if="book"  class="book-details ">
        <h4> Book Details</h4>
        <h5>{{publishedDate}}</h5>
        <h4 :class="price">Price: {{book.listPrice.amount}}</h4>
        <p>Title :{{book.title}}</p>
        <p>Description :{{book.description}}</p>
        <p>Page Count:  {{pageCount}} </p>
        <img v-bind:src="book.thumbnail">
        <router-link :to="'/book'">Back</router-link>
       <book-review @review="setReviews()"/>
      
      



    </section>
`,
  data() {
    return {
      book: null,
    };
  },
  created() {
    console.log(this.$route.params);
    const id = this.$route.params.bookId;
    bookService.get(id).then(book => (this.book = book));
  },
  components: {
    bookReview,
  },
  methods: {
    setReviews(rev) {
      // this.book.review = rev;
      console.log("rev", rev);
    },
  },
  computed: {
    pageCount() {
      if (this.book.pageCount > 500) {
        return "Long reading";
      } else if (this.book.pageCount < 500 && this.book.pageCount > 200) {
        return "Decent Reading";
      } else if (this.book.pageCount < 200 && this.book.pageCount > 100) {
        return "Light Reading";
      }
    },
    publishedDate() {
      let publish = this.book.publishedDate;
      console.log(publish);
      const date = new Date();
      const year = date.getFullYear();
      console.log("year", year);

      if (year - publish > 10) {
        return "Veteran Book ";
      } else if (year - publish < 10) {
        return "New!";
      }
    },
    price() {
      return {
        red: this.book.listPrice.amount > 150,
        green: this.book.listPrice.amount < 20,
      };
    },
  },
};
