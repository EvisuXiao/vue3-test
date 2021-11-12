import { createWebHashHistory, createRouter, RouteRecordRaw, Router } from 'vue-router'

const constantRoutes: Array<RouteRecordRaw> = [
  {
    name: 'index',
    path: '',
    component: () => import('~comp/HelloWorld.vue')
  }
]

const router: Router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes
})

export default router
