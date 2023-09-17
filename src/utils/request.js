import axios from 'axios'
import storage from 'store'
import { ACCESS_TOKEN } from '@/store/enums/mutation-types'
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
  return Promise.reject(error)
})
// 添加响应拦截器
request.interceptors.response.use(response => {
  const { status, data: { body, statusMsg, statusCode, tips } } = response
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  if (status === 200) {
    if (statusMsg === 'success') {
      return body
    } else {
      window.alert(tips)
      console.log(statusCode, statusMsg)
      throw new Error(tips)
    }
  }
  return response
}, error => {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error)
})
export default request
