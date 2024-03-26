import axios from 'axios'
import storage from 'store'
import store from '@/store'
import { clearAll } from '@/store/modules/user'
import router, { resetRouter } from '@/router'
import { ACCESS_TOKEN } from '@/store/enums/mutation-types'
import { Initializer } from '@/core/boot'
import { message } from 'ant-design-vue'
import defaultSettings from '@/config/default-settings'
// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 60000 // 请求超时时间
})
console.log(process.env.VUE_APP_BASE_URL)
// 添加请求拦截器
request.interceptors.request.use(config => {
  // 请求头添加
  const token = storage.get(ACCESS_TOKEN)
  // 让每个请求携带自定义 token 请根据实际情况自行修改
  if (token) {
    config.headers[ACCESS_TOKEN] = token
  }
  return config
}, error => {
  // 对请求错误做些什么
  throw new Error(JSON.stringify({
    tips: error.message,
    statusCode: error.response.status
  }))
})
// 添加响应拦截器
request.interceptors.response.use(response => {
  const { status, data: { body, statusMsg, statusCode, stackTrace, tips, token } } = response
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  if (status === 200) {
    if (statusMsg === 'success') {
      // 刷新token
      if (token) {
        const expireTime = new Date().getTime() + defaultSettings.tokenExpire
        storage.set(ACCESS_TOKEN, token, expireTime)
        store.commit('SET_TOKEN', token)
      }
      return body
    } else if (statusMsg === 'unauthorized') {
      message.error('登录超时, 请重新登录')
      clearAll(store.commit).then(() => {
        // 跳转登录并重新初始化
        router.push({ path: '/login' }).then(() => {
          Initializer().then(resetRouter)
        })
      })
    } else {
      // 抛出错误, 外部进行捕获
      throw new Error(JSON.stringify({
        statusCode,
        statusMsg,
        stackTrace,
        tips
      }))
    }
  }
  return response
}, error => {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  throw new Error(JSON.stringify({
    tips: error.message,
    statusCode: error.response.status
  }))
})
export default request
