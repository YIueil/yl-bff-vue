/**
 * Author:YIueil
 * Date:2022/11/15 23:16
 * Description: 用户状态管理块
 */
import userApi from '@/api/user'

const user = {
  state() {
    return {
      userInfo: {},
      userRole: {},
      loginState: false
    }
  },
  mutations: {
    SET_USER_INFO(state, userInfo) {
      state.userInfo = userInfo
    },
    SET_USER_ROLE(state, userRole) {
      state.userRole = userRole
    },
    SET_USER_LOGIN_STATE(state, loginState) {
      state.loginState = loginState
    }
  },
  actions: {
    async initUser({ commit }) {
      const userInfo = await userApi.getUserInfo()
      commit('SET_USER_INFO', userInfo)
    }
  }
}

export default user
