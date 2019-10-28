import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './views/Dashboard.vue'
import Login from '@/views/Login'
import store from './store/store'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (store.getters.isLogged) {
    to.path == '/' && next({name: 'dashboard'})
    to.path == '/login' && next({name: 'dashboard'})
    next()
  } else {
    to.path != '/' && next({name: "login"});
    next()
  }
})

export default router