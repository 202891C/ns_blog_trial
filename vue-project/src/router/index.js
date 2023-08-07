import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import BlogView from '../views/BlogView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // },
    {
      path: '/',
      name: 'home',
      component: () => import('../views/BlogView.vue')
    },
    // {
    //   path: '/login',
    //   name: 'login',
    //   component: () => import('../views/Login.vue')
    // },
    {
      path: '/edit/:id',
      name: 'edit',
      component: () => import('../views/EditBlog.vue')
    },
    {
      path: '/error',
      name: 'error',
      component: () => import('../views/ErrorPage.vue')
    },
  ]
})

export default router
