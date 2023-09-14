import Vue from 'vue'
import Vuex from 'vuex'
import user from '@/store/modules/user'
import app from '@/store/modules/app'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  getters: {
    userRoutes: state => state.user.userRoutes
  },
  mutations: {},
  actions: {},
  modules: {
    user,
    app
  }
})
