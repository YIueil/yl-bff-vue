import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 解决重复点击相同路由报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

/**
 * 通用路由
 */
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView'),
    children: [{
      path: 'page/:pageId',
      name: 'page',
      props: true,
      component: () => import('@/views/editor/EditorView')
    }, {
      path: '/setting',
      name: 'setting',
      component: () => import('@/views/common/setting/SettingView')
    }]
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
  routes
})

/**
 * 前置导航守卫
 */
router.beforeEach((to, from, next) => {
  next()
})

export default router
