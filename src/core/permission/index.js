import router, { resetRouter } from '@/router'
import { ACCESS_TOKEN } from '@/store/enums/mutation-types'
import store from '@/store'
import storage from 'store'
import { includes } from '@/utils/tree'
// 路由白名单
const allowRouterList = [
  '401',
  '404',
  '500',
  'Login',
  'Register',
  'About',
  'Test'
  // 'TestComponent'
]
/**
 * 前置路由导航守卫
 */
router.beforeEach((to, from, next) => {
  console.log(to)
  if (allowRouterList.includes(to.name)) {
    // 在路由白名单，直接进入
    return next()
  }
  const token = storage.get(ACCESS_TOKEN)
  if (token) {
    if (store.getters.useUserRoutes) {
      // todo 加载用户路由
      resetRouter()
    }
    // 1.检查路由访问权限
    if (checkRoute(to)) {
      // 2.获取路由路由操作权限
      setRouteAuth(to)
      return next()
    } else {
      window.alert('没有该模块的权限')
      return
    }
  }
  return next('/401')
})
router.afterEach(() => {
  // 路由导航结束做点什么
})
/**
 * 检查路由
 * @param toRoute
 * @returns {boolean}
 */
function checkRoute(toRoute) {
  if (toRoute.meta && toRoute.meta.rightName) {
    return includes(store.getters.userFunctions, 'rightName', toRoute.meta.rightName)
  }
  return true
}
/**
 * 设置页面权限
 * @param toRoute
 */
function setRouteAuth(toRoute) {
  console.log(toRoute)
}
