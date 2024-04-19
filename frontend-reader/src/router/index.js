import { createWebHistory, createRouter } from "vue-router";
import HomePage from "../views/HomePage.vue";
import HistoryPage from "../views/HistoryPage.vue";
import FavoritesPage from "../views/FavoritesPage.vue";
import ProfilePage from "../views/ProfilePage.vue";
import LoginPage from "../views/LoginPage.vue";
import SignupPage from "../views/SignupPage.vue";
import BookDetailsPage from "../views/BookDetailsPage.vue";
import NotFound from "../views/NotFound.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomePage,
  },
  {
    path: "/books/:id",
    name: "book-details",
    component: BookDetailsPage,
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
  },
  {
    path: "/signup",
    name: "signup",
    component: SignupPage,
  },
  {
    path: "/history",
    name: "history",
    component: HistoryPage,
  },
  {
    path: "/favorites",
    name: "favorites",
    component: FavoritesPage,
  },
  {
    path: "/profile",
    name: "profile",
    component: ProfilePage,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: NotFound,
  },
  // {
  //   path: "/contacts/:id",
  //   name: "contact.edit",
  //   component: ContactEdit,
  //   props: true,
  // },
  // {
  //   path: "/contacts/create",
  //   name: "contact.add",
  //   component: ContactCreate,
  //   props: true,
  // },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
