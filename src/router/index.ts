import { createWebHashHistory, createRouter, RouteRecordRaw, Router } from 'vue-router'

const constantRoutes: Array<RouteRecordRaw> = [
  {
    name: 'index',
    path: '',
    component: () => import('~view/Login/index.vue')
  },
  {
    name: 'list',
    path: '/list',
    component: () => import('~view/ListTest.vue')
  }
]

const router: Router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes
})

export default router
