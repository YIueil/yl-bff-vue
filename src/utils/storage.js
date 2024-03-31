import defaultSettings from '@/config/default-settings'
import * as storage from 'store'
import { ACCESS_TOKEN } from '@/store/enums/mutation-types'

/**
 * 持久化设置
 * @param name 设置项
 * @param value 设置值
 */
export function storageSetting(name, value) {
  const expireTime = new Date().getTime() + defaultSettings.tokenExpire
  storage.set(name, value, expireTime)
}

/**
 * 移除持久项
 * @param name
 */
export function remove(name) {
  storage.remove(name)
}

/**
 * 清除Token
 */
export function clearToken() {
  storage.remove(ACCESS_TOKEN)
}

/**
 * 清除所有store
 */
export function clearAll() {
  storage.clearAll()
}
