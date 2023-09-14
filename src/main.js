import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/iconfont/iconfont.css'
import '@/assets/iconfont/iconfont' // iconfont 图标库
import '@/core/directives'
import '@/core/filter'
// 应用初始化
import { Initializer } from '@/core/boot'

new Vue({
  router,
  store,
  render: h => h(App),
  created: Initializer
}).$mount('#app')
