/**
 * Author:YIueil
 * Date:2022/12/23 15:31
 * Description: 文章状态管理块
 */
import pageApi from '@/api/page'

const page = {
  state() {
    return {
      pageList: []
    }
  },
  mutations: {
    SET_PAGE(state, pageList) {
      state.pageList = pageList
    }
  },
  actions: {
    async initPageList({ commit }) {
      const pageList = await pageApi.listPageTree({
        spaceId: 0
      })
      commit('SET_PAGE', pageList)
    }
  }
}

export default page
