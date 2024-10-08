import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Details from '../views/Details.vue'
import Bookmark from '../views/Bookmark.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { transition: 'slide-right' }
  },
  {
   path: '/details/:idMovie',
   name: 'Details', 
   component: Details,
   meta: { transition: 'slide-right' }
  },
  {
     path: '/bookmark',
     name: 'Bookmark',
     component: Bookmark
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.PROD ? import.meta.env.VITE_BASE_URL : '/'),
  routes
})

export default router