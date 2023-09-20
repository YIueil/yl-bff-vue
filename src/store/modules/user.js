/**
 * Author:YIueil
 * Date:2022/11  /15 23:16
 * Description: userStore 保存用户信息和用户角色权限信息
 */
import { ACCESS_TOKEN } from '@/store/enums/mutation-types'
import { login, logout, getUserInfo, getUserRoles, getUserPermissions, getUserFunctions } from '@/api/userService'
import storage from 'store'
import defaultSettings from '@/config/defaultSettings'
import expirePlugin from 'store/plugins/expire'
// 添加
storage.addPlugin(expirePlugin)
const user = {
  state() {
    return {
      // token
      token: null,
      // 用户基本信息
      userInfo: {},
      // 用户角色列表
      userRoles: [],
      // 用户权限列表
      userPermissions: [],
      // 用户应用功能列表
      userFunctions: [],
      // 用户路由
      userRoutes: []
    }
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_USER_INFO(state, userInfo) {
      state.userInfo = userInfo
    },
    SET_ROLE(state, userRoles) {
      state.userRoles = userRoles
    },
    SET_PERMISSION(state, userPermissions) {
      state.userPermissions = userPermissions
    },
    SET_FUNCTION(state, userFunctions) {
      state.userFunctions = userFunctions
    }
  },
  actions: {
    // 登录
    async Login({ dispatch, commit }, userInfo) {
      try {
        const token = await login({
          loginName: userInfo.loginName,
          password: userInfo.password
        })
        const expireTime = new Date().getTime() + defaultSettings.tokenExpire
        storage.set(ACCESS_TOKEN, token, expireTime)
        commit('SET_TOKEN', token)
        await getUserResources(dispatch)
      } catch ({ message }) {
        const errorObj = JSON.parse(message)
        window.alert(errorObj.tips)
      }
    },
    // 登出
    async Logout({ commit }) {
      await logout(commit)
    },
    // 获取用户信息
    async getUserInfo({ commit }) {
      const userInfo = await getUserInfo()
      commit('SET_USER_INFO', userInfo)
    },
    // 获取用户角色
    async GetRoles({ commit }) {
      const roles = await getUserRoles()
      commit('SET_ROLE', roles)
    },
    // 获取用户权限
    async GetPermissions({ commit }) {
      const permissions = await getUserPermissions()
      commit('SET_PERMISSION', permissions)
    },
    // 获取用户应用功能
    async GetFunctions({ getters, commit }) {
      const userFunctions = await getUserFunctions({
        applicationId: getters.applicationId
      })
      commit('SET_FUNCTION', userFunctions)
    }
  }
}
/**
 * 获取用户资源
 * @param dispatch
 * @returns {Promise<void>}
 */
export async function getUserResources(dispatch) {
  // 登录成功后获取用户信息
  await dispatch('getUserInfo')
  await dispatch('GetRoles')
  await dispatch('GetPermissions')
  await dispatch('GetFunctions')
}
/**
 * 去除所有登陆信息
 * @param commit
 * @returns {Promise<void>}
 */
export async function clearAll(commit) {
  commit('SET_TOKEN', '')
  commit('SET_ROLES', [])
  commit('SET_ROLES', [])
  storage.clearAll()
}
export default user
