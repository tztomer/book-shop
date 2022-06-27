export default {
  template: `
<section class="reviews">
  <h3>Your Review</h3>
  <form action="" @submit="getFormData">

<input ref="input" v-model="posts.name" placeholder="Your full name" />

<select v-model="posts.selected">
  <option disabled value="">Please select one</option>
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>

<input type="date" v-model="posts.date">
<textarea v-model="posts.message" placeholder="Add You Review"></textarea>


<button>Send</button>
  </form>
</section>
`,
  data() {
    return {
      posts: {
        name: null,
        selected: null,
        date: null,
        message: null,
      },
    };
  },
  created() {},
  methods: {
    getFormData(e) {
      e.preventDefault();
      this.$emit("review", this.posts);
      console.log(this.posts);
    },
  },
  computed: {},
  mounted() {
    this.$refs.input.focus();
  },
  unmounted() {},
};
