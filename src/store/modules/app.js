/**
 * Author: YIueil
 * Date: 2023/9/14 14:40
 * Description: appStore 保存所有的应用运行状态
 */
import storage from 'store'
import {
  // 终端(PC、移动)
  TOGGLE_MOBILE_TYPE,
  // i18n
  APP_LANGUAGE
} from '@/store/enums/mutation-types'

const app = {
  state: {
    sideCollapsed: false,
    isMobile: false,
    theme: 'dark',
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
