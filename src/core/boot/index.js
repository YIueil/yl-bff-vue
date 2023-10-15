/**
 * Author: YIueil
 * Date: 2023/9/14 18:08
 * Description: 初始化启动初始化
 */
import Vue from 'vue'
import store from '@/store'
import storage from 'store'
// 默认配置项
import defaultSettings from '@/config/default-settings'
import { APP_ID, USE_USER_ROUTES, ACCESS_TOKEN, TOGGLE_MOBILE_TYPE } from '@/store/enums/mutation-types'
// iconfont 图标库
import '@/assets/iconfont/iconfont.css'
import '@/assets/iconfont/iconfont'
// ant design vue
import '@/core/antd'
// 全局样式
import '@/global.less'
// 自定义指令
import '@/core/directives'
// 过滤器
import '@/core/filter'
// 路由导航
import '@/core/permission'
// 启动图
import printBanner from './banner'
import { getUserResources } from '@/store/modules/user'
// lodash
import clonedeep from 'lodash.clonedeep'
import pick from 'lodash.pick'

export async function Initializer() {
  // lodash工具类注册
  Vue.prototype.cloneDeep = clonedeep
  Vue.prototype.pick = pick
  // 打印 banner
  printBanner()
  // 页面刷新重新加载 Vuex App应用数据
  store.commit(APP_ID, defaultSettings.applicationId)
  store.commit(USE_USER_ROUTES, defaultSettings.useUserRoutes)
  if(window.innerWidth < 768){
    // 移动端
    store.commit(TOGGLE_MOBILE_TYPE, true)
  } else {
    // 桌面端
    store.commit(TOGGLE_MOBILE_TYPE, false)
  }
  // 获取到token, 重新加载用户信息
  const token = storage.get(ACCESS_TOKEN)
  setTimeout(async() => {
    if (token && !store.getters.userInfo.userName) {
      store.commit('SET_TOKEN', token)
      await getUserResources(store.dispatch)
    }
  })
}
