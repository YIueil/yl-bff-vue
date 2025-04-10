/**
 * Author:YIueil
 * Date:2022/11  /15 23:16
 * Description: userStore 保存用户信息和用户角色权限信息
 */
import { getUserInfo, getUserPermissions, getUserRoles, login, logout } from '@/api/userService'
import storage from 'store'
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
      // 用户路由
      userRoutes: [],
      // 用户登录状态
      loginState: false
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
    SET_LOGIN_STATE(state, loginState) {
      state.loginState = loginState
    }
  },
  actions: {
    // 登录
    async Login({ dispatch, commit }, userInfo) {
      try {
        const user = await login({
          loginName: userInfo.loginName,
          password: userInfo.password
        })
        console.log(user, commit)
        // commit('SET_TOKEN', token)
        // 登录成功后获取用户信息
        await dispatch('getUserInfo')
        await dispatch('GetRoles')
        await dispatch('GetPermissions')
      } catch ({ message }) {
        const errorObj = JSON.parse(message)
        window.alert(errorObj.tips)
      }
    },
    // 登出
    async Logout({ commit }) {
      await logout()
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      commit('SET_ROLES', [])
      storage.clearAll()
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
    }
  }
}
export default user
