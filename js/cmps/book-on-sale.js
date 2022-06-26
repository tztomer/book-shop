export default {
  props: ["book"],
  template: `
 <span :class="onSale">
  {{onSaleTxt}}
</span>
`,

  computed: {
    onSale() {
      return { red: this.book.listPrice.isOnSale === true };
    },
    onSaleTxt() {
      if (this.book.listPrice.isOnSale === true) {
        return "On Sale";
      }
    },
  },
};
