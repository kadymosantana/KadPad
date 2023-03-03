import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import Profile from '@/views/Profile.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { name: 'Login', path: '/', component: Login },
    { name: 'Home', path: '/home', component: Home },
    { name: 'Profile', path: '/profile', component: Profile }
  ]
})

export default router
