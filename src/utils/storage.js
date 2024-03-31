import defaultSettings from '@/config/default-settings'
import * as storage from 'store'

/**
 * 持久化设置
 * @param name 设置项
 * @param value 设置值
 */
export function storageSetting(name, value) {
  const expireTime = new Date().getTime() + defaultSettings.tokenExpire
  storage.set(name, value, expireTime)
}
