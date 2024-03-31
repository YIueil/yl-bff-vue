/**
 * Author: YIueil
 * Date: 2023/9/14 14:40
 * Description: App Store 保存所有的应用运行状态
 */
import {
  // 应用id
  APP_ID,
  // 启用用户路由
  USE_USER_ROUTES,
  // 终端(PC、移动)
  TOGGLE_MOBILE_TYPE,
  // i18n
  APP_LANGUAGE,
  // 皮肤切换
  THEME_CHANGE,
  NAV_THEME,
  // 标签模式
  USE_TABS,
  // 侧边栏
  SHOW_SIDER,
  // 底栏
  SHOW_FOOTER,
  // 主题色
  PRIMARY_COLOR
} from '@/store/enums/mutation-types'
import { storageSetting } from '@/utils/storage'
import themeUtils from '@/utils/theme'

const app = {
  state: {
    // 应用id
    applicationId: '',
    // 启用用户路由
    useUserRoutes: false,
    // 启用标签模式
    useTabsMode: true,
    // 是否移动端
    isMobile: false,
    // 日间夜间模式
    theme: 'light',
    // 主题色
    primaryColor: '',
    // 布局类型
    layout: '',
    showSider: true,
    showFooter: true,
    sideCollapsed: false,
    contentWidth: '',
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
    },
    [THEME_CHANGE]: (state, theme) => {
      if (theme) {
        state.theme = theme
      } else {
        state.theme = state.theme === NAV_THEME.LIGHT ? NAV_THEME.DARK : NAV_THEME.LIGHT
      }
    },
    [USE_TABS]: (state, useTabs) => {
      if (useTabs) {
        state.useTabsMode = useTabs
      } else {
        state.useTabsMode = !state.useTabsMode
      }
    },
    [SHOW_SIDER]: (state, showSider) => {
      state.showSider = showSider
    },
    [SHOW_FOOTER]: (state, showFooter) => {
      state.showFooter = showFooter
    },
    [PRIMARY_COLOR]: (state, primaryColor) => {
      state.primaryColor = primaryColor
      themeUtils.changeColor(primaryColor)
    }
  },
  actions: {
    setLang({ commit }, lang) {
      console.log(commit, lang)
    },
    changeTheme({ commit }, { theme, isStorage }) {
      commit(THEME_CHANGE, theme)
      if (isStorage) {
        storageSetting(THEME_CHANGE, theme)
      }
    },
    setAppLang({ commit }, { lang, isStorage }) {
      commit(APP_LANGUAGE, lang)
      if (isStorage) {
        storageSetting(APP_LANGUAGE, lang)
      }
    },
    setTabsMode({ commit }, { useTabs, isStorage }) {
      commit(USE_TABS, useTabs)
      if (isStorage) {
        storageSetting(USE_TABS, useTabs)
      }
    },
    changeShowSider({ commit }, { showSider, isStorage }) {
      commit(SHOW_SIDER, showSider)
      if (isStorage) {
        storageSetting(SHOW_SIDER, showSider)
      }
    },
    changeShowFooter({ commit }, { showFooter, isStorage }) {
      commit(SHOW_FOOTER, showFooter)
      if (isStorage) {
        storageSetting(SHOW_FOOTER, showFooter)
      }
    },
    changePrimaryColor({ commit }, { primaryColor, isStorage }) {
      commit(PRIMARY_COLOR, primaryColor)
      if (isStorage) {
        storageSetting(PRIMARY_COLOR, primaryColor)
      }
    }
  }
}
export default app
