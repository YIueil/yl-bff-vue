import Vue from 'vue'
import Vuex from 'vuex'
import user from '@/store/modules/user'
import app from '@/store/modules/app'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  getters: {
    applicationId: state => state.app.applicationId,
    useUserRoutes: state => state.app.useUserRoutes,
    userRoutes: state => state.user.userRoutes,
    userInfo: state => state.user.userinfo,
    userPermissions: state => state.user.userPermissions,
    userFunctions: state => state.user.userFunctions
  },
  mutations: {},
  actions: {},
  modules: {
    user,
    app
  }
})
