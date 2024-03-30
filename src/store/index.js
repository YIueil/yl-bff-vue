import Vue from 'vue'
import Vuex from 'vuex'
import user from '@/store/modules/user'
import app from '@/store/modules/app'
import menu from '@/store/modules/menu'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  getters: {
    // menu
    menuList: state => state.menu.menuList,
    modelList: state => state.menu.modelList,
    currentModel: state => state.menu.currentModel,
    // app
    isMobile: state => state.app.isMobile,
    theme: state => state.app.theme,
    showSider: state => state.app.showSider,
    showFooter: state => state.app.showFooter,
    useTabs: state => state.app.useTabsMode,
    primaryColor: state => state.app.primaryColor,
    applicationId: state => state.app.applicationId,
    useUserRoutes: state => state.app.useUserRoutes,
    // user
    userRoutes: state => state.user.userRoutes,
    userInfo: state => state.user.userInfo,
    userPermissions: state => state.user.userPermissions,
    userFunctions: state => state.user.userFunctions
  },
  mutations: {},
  actions: {},
  modules: {
    menu,
    user,
    app
  }
})
