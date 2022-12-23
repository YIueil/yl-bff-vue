import request from '@/utils/request'

export default {
  listSpace() {
    return request({
      url: '/space/list',
      method: 'get'
    })
  },
  addSpace(data) {
    return request({
      url: '/space',
      method: 'post',
      data
    })
  },
  deleteSpace(id) {
    return request({
      url: `/space/${id}`,
      method: 'delete'
    })
  },
  updateSpace(params) {
    console.log(params)
  }
}
