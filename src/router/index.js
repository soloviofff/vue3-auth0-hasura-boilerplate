import { createRouter, createWebHistory } from 'vue-router'

import Auth from '../plugins/auth0'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    // beforeEnter: Auth.routeGuard,
  },
  // {
  //   path: '/profile',
  //   name: 'Profile',
  //   beforeEnter: Auth.routeGuard,
  //   component: () =>
  //     import(/* webpackChunkName: "profile" */ '../views/Profile.vue'),
  // },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router