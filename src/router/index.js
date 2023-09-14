import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

/**
 * 基础路由: 路由包含三部分(基础路由、静态路由、动态路由)
 */
const baseRoutes = [
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
  baseRoutes
})

/**
 * 前置路由导航守卫
 */
router.beforeEach((to, from, next) => {
  // todo 判断当前的路由是否需要登录
  next()
})

export default router
