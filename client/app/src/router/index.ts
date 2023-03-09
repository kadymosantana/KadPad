import { createRouter, createWebHistory } from 'vue-router'

import store from '../store'

import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import Profile from '@/views/Profile.vue'
import NoteModal from '@/components/NoteModal.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { name: 'Login', path: '/', component: Login },
    { name: 'Home', path: '/home', component: Home },
    { name: 'Profile', path: '/profile', component: Profile },
    { name: 'Note', path: '/note', component: NoteModal, meta: { transition: 'modal' } }
  ]
})

router.beforeEach(async (to, from) => {
  if (!store.userAuthData && to.name !== 'Login') return { name: 'Login' }
})

export default router
