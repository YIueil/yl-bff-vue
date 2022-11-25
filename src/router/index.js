import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

/**
 * 通用路由
 */
const constantRoutes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView')
  },
  {
    path: '/401',
    name: '401',
    component: () => import('@/views/common/exception/401')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/common/exception/404')
  },
  {
    path: '/500',
    name: '500',
    component: () => import('@/views/common/exception/500')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/common/about/AboutView')
  }
]

const router = new VueRouter({
  constantRoutes
})

/**
 * 前置导航守卫
 */
router.beforeEach((to, from, next) => {
  next()
})

export default router
