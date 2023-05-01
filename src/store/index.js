import Vue from 'vue'
import Vuex from 'vuex'
import user from '@/store/modules/user'
import page from '@/store/modules/page'
import space from '@/store/modules/space'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    theme: 'light',
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
    setLightTheme() {
      this.state.theme = 'light'
    },
    setDarkTheme() {
      this.state.theme = 'dark'
    }
  },
  actions: {},
  modules: {
    user,
    page,
    space
  }
})
