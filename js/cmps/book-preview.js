export default {
  props: ["book"],
  template: `
    <p>Authors: {{book.authors.join("")}}</p>
    <p>Categories: {{book.categories.join(", ")}}</p>
`,
  data() {
    return {};
  },
  methods: {},
  computed: {},
};
