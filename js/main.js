const { createApp } = Vue;

import appHeader from "./cmps/book-header.js";
import appFooter from "./cmps/book-footer.js";

import bookApp from "./views/book.app.js";
// import { bookService } from "./services/book-service.js";
const options = {
  template: `
 
  <app-header />
  <book-app /> 
  <app-footer />
    `,
  data() {
    return {
      header: "Hello",
    };
  },
  components: {
    bookApp,
    appHeader,
    appFooter,
  },
};

const app = Vue.createApp(options);
app.mount("#app");
