import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import localCache from '../utils/cache'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/main',
    redirect: '/main/home'
  },
  {
    path: '/login',
    component: () => import('@/views/login/Login.vue')
  },
  {
    path: '/main',
    component: () => import('@/views/main/Main.vue'),
    children:[
      {
      path: 'users',
      component: () => import('@/views/main-child/users/Users.vue')
    },
    {
      path: 'roles',
      component: () => import('@/views/main-child/roles/Roles.vue')
    },
    {
      path: 'rights',
      component: () => import('@/views/main-child/rights/Rights.vue')
    },
    {
      path: 'goods',
      component: () => import('@/views/main-child/goods/Goods.vue')
    },
    {
      path: 'params',
      component: () => import('@/views/main-child/params/Params.vue')
    },
    {
      path: 'categories',
      component: () => import('@/views/main-child/categories/Categories.vue')
    },
    {
      path: 'orders',
      component: () => import('@/views/main-child/orders/Orders.vue')
    },
    {
      path: 'home',
      component: () => import('@/views/main-child/home/Home.vue')
    }
  ]
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to) => {
  if (to.path !== '/login') {
    const token = localCache.getCache('token')
    if (!token) {
      return '/login'
    }
  }
})
export default router
