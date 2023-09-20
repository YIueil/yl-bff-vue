import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from '@/store'
// 引入通用路由和静态路由
import baseRouter from './base-router'
import constantRouter from './constant-router'
// 防止重复路由跳转
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)
/**
 * 基础路由: 路由包含三部分(基础路由、静态路由、用户路由)
 */
const router = new VueRouter({
  mode: 'history',
  routes: baseRouter.concat(constantRouter)
})

export default router
