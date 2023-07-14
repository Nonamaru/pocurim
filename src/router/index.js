import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/AuthView.vue'

const zareganLi = function (to, from, next) {
  if (localStorage.getItem('id') == null) {
      next({name: 'auth'});
  } else {
      next();
  }
}
const ujeEst = function (to, from, next) {
  if (localStorage.getItem('id') == null) {
      next();
  } else {
      next({name: 'main'});
  }
}

const routes = [
  {
    path: '/',
    name: 'auth',
    component: HomeView,
    beforeEnter: ujeEst,
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('../views/MainView.vue'),
    beforeEnter: zareganLi,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
