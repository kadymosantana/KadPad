import { createRouter, createWebHistory } from "vue-router";

import store from "../store";

const Login = import("@/views/Login.vue");
const Home = import("@/views/Home.vue");
const Profile = import("@/views/Profile.vue");

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { name: "Login", path: "/", component: Login },
    { name: "Home", path: "/home", component: Home },
    { name: "Profile", path: "/profile", component: Profile }
  ]
});

router.beforeEach((to, from, next) => {
  if (!store.authData && to.name !== "Login") next({ name: "Login" });
  next();
});

export default router;
