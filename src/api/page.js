import request from '@/utils/request'

export default {
  listPageTree(params) {
    return request({
      url: '/page/tree',
      method: 'get',
      params
    })
  },
  getPage(params) {
    return request({
      url: `/page/${ params.id }`,
      method: 'get'
    })
  },
  addPage(data) {
    return request({
      url: '/page',
      method: 'post',
      data
    })
  },
  deletePage(params) {
    return request({
      url: `/page/${ params.id }`,
      method: 'delete'
    })
  },
  updatePage(params, data) {
    return request({
      url: `/page/${ params.id }`,
      method: 'put',
      data
    })
  }
}
