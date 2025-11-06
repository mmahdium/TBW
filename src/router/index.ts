import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFoundView.vue'),
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/list',
    name: 'list',
    component: () => import('@/views/ListView.vue'),
  },
  {
    path: '/details/:type/:id',
    name: 'details',
    component: () => import('@/views/DetailsView.vue'),
  },
  {
    path: '/add',
    name: 'add',
    component: () => import('@/views/AddView.vue'),
  },
  {
    path: '/watch/:name/:id',
    name: 'watch',
    component: () => import('@/views/WatchView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

export default router
