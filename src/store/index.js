import Vue from 'vue'
import Vuex from 'vuex'
import user from '@/store/modules/user'
import page from '@/store/modules/page'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    drawer: {
      model: null,
      type: 'default (no property)',
      clipped: true,
      floating: false,
      mini: false
    },
    footer: {
      inset: true
    }
  },
  getters: {},
  mutations: {
  },
  actions: {},
  modules: {
    user,
    page
  }
})
