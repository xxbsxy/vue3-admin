import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import localCache from '../utils/cache'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    component: () => import('@/views/login/Login.vue')
  },
  {
    path: '/',
   redirect:'/home'
  },
  {
    path: '/',
    component: () => import('@/views/main/Main.vue'),
    children: [
      {
        path: '/home',
        component: () => import('@/views/main-child/home/Home.vue'),
        meta:{
          title:'后台首页'
        }
      },
      {
        path: 'users',
        component: () => import('@/views/main-child/users/Users.vue'),
        meta:{
          title:'用户列表'
        }
      },

      {
        path: 'roles',
        component: () => import('@/views/main-child/roles/Roles.vue'),
        meta:{
          title:'角色列表'
        }
      },
      {
        path: 'rights',
        component: () => import('@/views/main-child/rights/Rights.vue'),
        meta:{
          title:'权限列表'
        }
      },
      {
        path: 'goods',
        component: () => import('@/views/main-child/goods/Goods.vue'),
        meta:{
          title:'商品列表'
        }
      },
      {
        path: 'params',
        component: () => import('@/views/main-child/params/Params.vue'),
        meta:{
          title:'分类参数'
        }
      },
      {
        path: 'categories',
        component: () => import('@/views/main-child/categories/Categories.vue'),
        meta:{
          title:'商品分类'
        }
      },
      {
        path: 'orders',
        component: () => import('@/views/main-child/orders/Orders.vue'),
        meta:{
          title:'订单列表'
        }
      },
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/not-found/NotFound.vue')
  }
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
