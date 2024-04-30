import { createWebHistory, createRouter } from "vue-router";
import HomePage from "../views/HomePage.vue";
import HistoryPage from "../views/HistoryPage.vue";
import FavoritesPage from "../views/FavoritesPage.vue";
import ProfilePage from "../views/ProfilePage.vue";
import EditProfilePage from "../views/EditProfilePage.vue";
import LoginPage from "../views/LoginPage.vue";
import SignupPage from "../views/SignupPage.vue";
import BookDetailsPage from "../views/BookDetailsPage.vue";
import SearchPage from "../views/SearchPage.vue";
import GenresPage from "../views/GenresPage.vue";
import NotFound from "../views/NotFound.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomePage,
  },

  {
    path: "/home",
    redirect: { name: "home" },
  },

  {
    path: "/books",
    children: [
      {
        path: "",
        name: "genres",
        component: GenresPage,
      },

      {
        path: "search",
        name: "search",
        component: SearchPage,
      },

      {
        path: ":id",
        name: "book-details",
        component: BookDetailsPage,
      },
    ],
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
    children: [
      {
        path: "",
        name: "profile",
        component: ProfilePage,
      },

      {
        path: "edit",
        name: "profile-edit",
        component: EditProfilePage,
      },
    ],
  },

  {
    path: "/account",
    redirect: { name: "profile" },
  },

  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (from.name === "genres" && to.name === "genres") return;

    return { left: 0, top: 0 };
  },
});

export default router;
