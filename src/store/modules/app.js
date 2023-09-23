/**
 * Author: YIueil
 * Date: 2023/9/14 14:40
 * Description: App Store 保存所有的应用运行状态
 */
import storage from 'store'
import {
  // 应用id
  APP_ID,
  // 启用用户路由
  USE_USER_ROUTES,
  // 终端(PC、移动)
  TOGGLE_MOBILE_TYPE,
  // i18n
  APP_LANGUAGE
} from '@/store/enums/mutation-types'

const app = {
  state: {
    // 应用id
    applicationId: '',
    // 启用用户路由
    useUserRoutes: false,
    sideCollapsed: false,
    isMobile: false,
    theme: 'light',
    layout: '',
    contentWidth: '',
    fixedHeader: false,
    fixedSidebar: false,
    autoHideHeader: false,
    color: '',
    weak: false,
    multiTab: true,
    lang: 'en-US',
    _antLocale: {}
  },
  mutations: {
    [APP_ID]: (state, applicationId) => {
      state.applicationId = applicationId
    },
    [USE_USER_ROUTES]: (state, useUserRoutes) => {
      state.useUserRoutes = useUserRoutes
    },
    [TOGGLE_MOBILE_TYPE]: (state, isMobile) => {
      state.isMobile = isMobile
    },
    [APP_LANGUAGE]: (state, lang, antd = {}) => {
      state.lang = lang
      state._antLocale = antd
      storage.set(APP_LANGUAGE, lang)
    }
  },
  actions: {
    setLang({ commit }, lang) {
      console.log(commit, lang)
    }
  }
}
export default app
