import { createWebHashHistory, createRouter, RouteRecordRaw, Router } from 'vue-router'

const constantRoutes: Array<RouteRecordRaw> = [
  {
    name: 'index',
    path: '',
    component: () => import('~view/Login/index.vue')
  }
]

const router: Router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes
})

export default router
