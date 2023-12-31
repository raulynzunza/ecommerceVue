import { createRouter, createWebHistory } from 'vue-router'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () =>import('../views/HomeView.vue')
    },  
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboradView.vue')
    }, 
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../views/CartView.vue')
    }, 
    {
      path: '/addProduct',
      name: 'addProduct',
      component: () => import('../views/AddProductView.vue')
    }, 
  ]
})

export default router
