export default {
  props: ["book"],
  template: `
    <section class="book-details">
        <h4> Book Details</h4>
        <h5>{{publishedDate}}</h5>
        <h4 :class="price">Price: {{book.listPrice.amount}}</h4>
        <p>Title :{{book.title}}</p>
        <p>Description :{{book.description}}</p>
        <p>Page Count:  {{pageCount}} </p>
        <img v-bind:src="book.thumbnail">
        <button @click="$emit('close')">Back</button>
    </section>
`,
  data() {
    return {};
  },
  methods: {},
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
