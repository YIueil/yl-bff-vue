import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// iconfont 图标库
import '@/assets/iconfont/iconfont.css'
import '@/assets/iconfont/iconfont'
import '@/core/directives'
import '@/core/filter'
// ant design vue
import '@/core/antd'
// 全局样式
import './global.less'
// 应用初始化
import { Initializer } from '@/core/boot'

new Vue({
  router,
  store,
  render: h => h(App),
  created: Initializer
}).$mount('#app')
