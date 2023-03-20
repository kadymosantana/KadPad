import { createRouter, createWebHistory } from "vue-router";

import store from "../store";

const Login = import("@/views/Login.vue");
const Home = import("@/views/Home.vue");
const Profile = import("@/views/Profile.vue");
const NoteModal = import("@/components/NoteModal.vue");
const AddNoteModal = import("@/components/AddNoteModal.vue");

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { name: "Login", path: "/", component: Login },
    { name: "Home", path: "/home", component: Home },
    { name: "Profile", path: "/profile", component: Profile },
    { name: "Note", path: "/note/:id", component: NoteModal, meta: { transition: "modal" } },
    { name: "New Note", path: "/new-note", component: AddNoteModal, meta: { transition: "modal" } }
  ]
});

router.beforeEach((to, from, next) => {
  if (!store.authData && to.name !== "Login") next({ name: "Login" });
  else next();
});

export default router;
