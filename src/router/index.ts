import { createRouter, createWebHistory } from 'vue-router'
import HomeEmotaku from '../views/HomeEmotaku.vue'
import TestingEverything from '../views/TestingEverything.vue'
import TricksBoy from '../views/TricksBoy.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
  {
    path: '/',
    name: 'home',
    component: HomeEmotaku
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/testingEverything',
    name: 'testingEverything',
    component: TestingEverything
  },
  {
    path: '/tricksBoy',
    name: 'tricksBoy',
    component: TricksBoy
  }
]
})


export default router