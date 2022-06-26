export default {
  template: `
 <section class="book-filter">
    <pre>Filter by author: {{filterBy.authors}}</pre>
    <input type="text" v-model="filterBy.authors"  @input="filter">
 </section>
`,
  data() {
    return {
      filterBy: {
        authors: "",
      },
    };
  },
  methods: {
    filter() {
      this.$emit("filtered", this.filterBy);
    },
  },
  computed: {},
};
