import { bookService } from '../services/book-service.js';
// import { eventBus } from "../services/eventBus-service.js";
export default {
  template: `
    <section class="book-review-form">
        <!-- <pre>{{review}}</pre> -->
        <form @submit.prevent="add">
            <table>
                <tr>
                    <td>Full Name</td>
                    <td><input ref="rederName" type="text" v-model="review.rederName" placeholder="Full Name" required/></td>
                </tr>




                
                <tr>
                    <td>Book Rate</td>
                    <td> 
                        <div class="rate">
                            <span v-for="i in 5" :class="{star: i <= review.rate}" @click="setRating(i)">★</span>
                        </div>
                    </td>
                </tr>

                
                <tr>
                    <td>Reading Date</td>
                    <td><input v-model="review.readingDate" type="date" name="ReadingDate" id="ReadingDate" required/></td>
                </tr>

                <tr>
                    <td>Your Review</td>
                    <td>
                    <textarea v-model="review.bookReview" id="bookReview" name="bookReview" rows="4" cols="50" required></textarea>
                    </td>
                </tr>
            </table>
            <button>add</button>
        </form>
    </section>

    <section v-if="book" class="review-list">
        BOOK REVIEW
        <ul v-if="book.reviews">
            <li class="gray" v-for="review in book.reviews">

            <div>{{review.rederName}}</div>
            <div>{{review.rate }} ⭐️ stars</div>
            <div>{{review.readingDate}}</div>
            <div>{{review.bookReview}}</div>

                <button @click="remove(review.id)">X</button>
                <!-- <pre>{{review}}</pre> -->

            </li>
        </ul>
    </section>
    `,
  data() {
    return {
      book: null,
      review: {
        rederName: '',
        rate: '',
        readingDate: '',
        bookReview: '',
      },
    };
  },
  components: {},
  created() {
    const id = this.$route.params.bookId;
    bookService.get(id).then(book => (this.book = book));
  },
  mounted() {
    console.log(this.$refs.rederName);
    this.$refs.rederName.focus();
  },
  methods: {
    setRating(val) {
      this.review.rate = val;
    },
    add() {
      bookService.addReview(this.book.id, this.review).then(book => {
        this.book = book;
        this.review = bookService.getEmptyReview();
        // eventBus.emit("show-msg", { txt: `A review on book ${this.book.id} was successfully added`, type: "success" });
      });
    },
    remove(reviewId) {
      bookService.removeReview(this.book.id, reviewId).then(book => {
        this.book = book;
        eventBus.emit('show-msg', {
          txt: `A review on book ${this.book.id} was successfully removed`,
          type: 'success',
        });
      });
    },
  },
  computed: {},
};
