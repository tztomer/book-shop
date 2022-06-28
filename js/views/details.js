import { bookService } from '../services/book-service.js';
import bookReview from '../views/review-add.cmp.js';
const EUR_RATE = 3.6;
const USD_RATE = 3.41;

export default {
  template: `

    <section v-if="book" class="book-details">
        <div class="img-holder">
            <div v-if="book.listPrice.isOnSale" class="sale-sign">
                <!-- <img src="../../assets/icons/saleTag.svg" alt="" srcset=""> -->
            </div>

            <img :src="book.thumbnail" alt="" srcset="">
        </div>
        <div class="book-info">
            <table>
                <tr><td>Title</td><td>{{book.title}}</td></tr>
                <tr><td>ID</td><td>{{book.id}}</td></tr>
                <tr><td>Subtitle</td><td>{{book.subtitle}}</td></tr>
                <tr><td>language</td><td>{{book.language}}</td></tr>
                <tr><td>Published Date</td><td>{{formatedPublishedDate}}</td></tr>
                <tr><td>Page Count</td><td>{{formatedPageCount}}</td></tr>
                <tr><td>Description</td><td>{{book.description}}</td></tr>
                <tr><td>price</td><td :class="priceSytle">{{formatedPrice}}</td></tr>
            </table>
            <h4>Author</h4>
            <ul>
                <li v-for="author in book.authors">{{author}}</li>
            </ul>
            <h4>category</h4>
            <ul>
                <li v-for="category in book.categories">{{category}}</li>
            </ul>
        </div>
        <router-link class="info-btn" :to="'/book/'">back</router-link>
   

    <section class="book-reviwes">
        <book-review/>
    </section>
    </section>
    `,
  data() {
    return {
      book: null,
    };
  },
  components: {
    bookReview,
  },
  created() {
    const id = this.$route.params.bookId;
    bookService.get(id).then(book => (this.book = book));
  },

  methods: {},
  computed: {
    formatedPageCount() {
      const pageCount = this.book.pageCount;
      if (pageCount > 500) return `${pageCount} pages - Long reading`;
      if (pageCount > 200) return `${pageCount} pages - Decent Reading`;
      if (pageCount < 100) return `${pageCount} pages - Light Reading`;
      else return `${pageCount} pages`;
    },
    formatedPublishedDate() {
      const currDate = new Date();
      const yearsPassed = currDate.getFullYear() - this.book.publishedDate;
      if (yearsPassed > 10) return `${this.book.publishedDate} - Veteran Book`;
      if (yearsPassed < 1) return `${this.book.publishedDate} - New!`;
      else return this.book.publishedDate;
    },
    formatedPrice() {
      const currency = this.book.listPrice.currencyCode;
      const amount = this.book.listPrice.amount;
      return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
    },
    priceSytle() {
      var bookPrice;
      switch (this.book.listPrice.currencyCode) {
        case 'EUR':
          bookPrice = this.book.listPrice.amount * EUR_RATE;
          break;

        case 'USD':
          bookPrice = this.book.listPrice.amount * USD_RATE;
          break;

        default:
          bookPrice = this.book.listPrice.amount;
          break;
      }
      return { 'low-price': bookPrice < 20, 'high-price': bookPrice > 150 };
    },
  },
};
