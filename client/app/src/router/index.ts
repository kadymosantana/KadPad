import { createRouter, createWebHistory } from "vue-router";

import { authDataStore as authData } from "@/stores/authData";

const Login = () => import("@/views/Login.vue");
const Notes = () => import("@/views/Notes.vue");
const Profile = () => import("@/views/Profile.vue");
const NewNoteModal = () => import("@/views/NewNoteModal.vue");
const NoteModal = () => import("@/views/NoteModal.vue");

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { name: "Login", path: "/", component: Login },
    {
      name: "Notes",
      path: "/notes",
      component: Notes,
      children: [
        { name: "New Note", path: "new", component: NewNoteModal },
        { name: "Note", path: ":id", component: NoteModal }
      ]
    },
    { name: "Profile", path: "/profile", component: Profile }
  ]
});

router.beforeEach((to, from, next) => {
  if (!authData.token && to.name !== "Login") next({ name: "Login" });
  next();
});

export default router;
