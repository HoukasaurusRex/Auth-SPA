import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import SignIn from '../views/SignIn.vue'

Vue.use(VueRouter)

const isAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next()
    return
  }
  next('/Unauthorized')
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: SignIn
  },
  {
    path: '/secret-route',
    name: 'secret-route',
    beforeEnter: isAuthenticated,
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/SecretRoute.vue')
  },
  {
    path: '/Unauthorized',
    name: 'Unauthorized',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Unauthorized.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
