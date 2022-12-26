/**
 * Author:YIueil
 * Date:2022/12/23 15:31
 * Description: 空间状态管理块
 */
import spaceApi from '@/api/space'

const space = {
  state() {
    return {
      spaceList: []
    }
  },
  mutations: {
    SET_SPACE_LIST(state, spaceList) {
      state.spaceList = spaceList
    }
  },
  actions: {
    async initSpaceList({ commit }) {
      const spaceList = await spaceApi.listSpace()
      commit('SET_SPACE_LIST', spaceList)
    }
  }
}

export default space
