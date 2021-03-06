import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Checkout from '../views/Checkout.vue'
import Ordersuccess from '../views/Ordersuccess.vue'
import Uservalidation from '../views/Uservalidation'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/shoppingcart',
    name: 'Shoppingcart',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Shoppingcart.vue')
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout
  },
  {
    path: '/ordersuccess',
    name: 'Ordersuccess',
    component: Ordersuccess
  },
  {
    path: '/uservalidation',
    name: 'Uservalidation',
    component: Uservalidation
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
