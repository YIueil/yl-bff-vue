import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 应用初始化
import { Initializer } from '@/core/boot'

new Vue({
  router,
  store,
  render: h => h(App),
  created: Initializer
}).$mount('#app')
