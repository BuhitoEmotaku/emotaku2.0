import { createRouter, createWebHistory } from 'vue-router'
const HomeEmotaku = () => import('../views/HomeEmotaku.vue');
const ChatFeatures = () => import('../views/ChatFeatures.vue');
const MusicPlayer = () => import('../views/MusicPlayer/MusicEmotaku.vue');

//Hobbies
const HobbiesBuhitoGallery = () => import('../views/Hobbies/HobbiesBuhitoGallery.vue');

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
  {
    path: '/',
    name: 'HomeEmotaku',
    component: HomeEmotaku
  },
  {
    path: '/about',
    name: 'AboutEmotaku',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutEmotaku.vue')
  },
  {
    path: '/chatFeatures',
    name: 'ChatFeatures',
    component: ChatFeatures
  },
  {
    path: '/musicPlayer',
    name: 'MusicPlayer',
    component: MusicPlayer
  },
  
  //HOBBIES
  {
    path: '/HobbiesBuhitoGallery/:dataImages',
    name: 'HobbiesBuhitoGallery',
    component: HobbiesBuhitoGallery
  },
  {
    path: '/:catchAll(.*)',
    name: 'notFound',
    component: HomeEmotaku // Reemplaza 'NotFoundComponent' con el componente que desees mostrar
  }
]
})


export default router