import home from "../js/views/home-page.cmp.js";
import about from "../js/views/about-page.cmp.js";
import bookApp from "../js/views/book.app.js";
import bookDetails from "../js/views/details.js";
const routes = [
  {
    path: "/",
    component: home,
  },
  {
    path: "/book",
    component: bookApp,
  },
  {
    path: "/about",
    component: about,
  },
  {
    path: "/book/:bookId",
    component: bookDetails,
  },
];

export const router = VueRouter.createRouter({
  routes,
  history: VueRouter.createWebHashHistory(),
});
