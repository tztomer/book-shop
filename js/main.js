const { createApp } = Vue;

import appHeader from "./cmps/book-header.js";
import appFooter from "./cmps/book-footer.js";
import { router } from "./router.js";
import bookApp from "./views/book.app.js";
// import { bookService } from "./services/book-service.js";
const options = {
  template: `
 
  <app-header />
  <router-view/>
  
    <!-- <book-app />  -->
  <app-footer />
    `,
  data() {
    return {
      header: "Hello",
      active: false,
    };
  },
  components: {
    appHeader,
    bookApp,
    appFooter,
  },
};

const app = Vue.createApp(options);
app.use(router);
app.mount("#app");
