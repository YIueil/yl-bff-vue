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
import {
  APP_ID,
  USE_USER_ROUTES,
  ACCESS_TOKEN,
  TOGGLE_MOBILE_TYPE,
  USE_TABS,
  SHOW_SIDER,
  SHOW_FOOTER,
  THEME_CHANGE,
  PRIMARY_COLOR
} from '@/store/enums/mutation-types'
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

/**
 * 读取页面设置选项
 */
function loadPageSetting() {
  const useTabs = storage.get(USE_TABS)
  const showSider = storage.get(SHOW_SIDER)
  const showFooter = storage.get(SHOW_FOOTER)
  const themeChange = storage.get(THEME_CHANGE)
  const primaryColor = storage.get(PRIMARY_COLOR)
  store.commit(USE_TABS, useTabs)
  store.commit(SHOW_SIDER, showSider)
  store.commit(SHOW_FOOTER, showFooter)
  store.commit(THEME_CHANGE, themeChange)
  store.commit(PRIMARY_COLOR, primaryColor)
}

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
  // 读取用户自定义页面配置
  loadPageSetting()

  // 获取到token, 重新加载用户信息
  const token = storage.get(ACCESS_TOKEN)
  setTimeout(async() => {
    if (token && !store.getters.userInfo.userName) {
      store.commit('SET_TOKEN', token)
      await getUserResources(store.dispatch)
    }
  })
}
