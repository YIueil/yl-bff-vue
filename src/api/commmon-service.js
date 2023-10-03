import request from '@/utils/request'
const commonApi = {
  searchOne: '/query/searchOne',
  searchPage: '/query/searchPage'
}
export function searchOne(params) {
  return request({
    url: commonApi.searchOne,
    method: 'get',
    params
  })
}
export function searchPage(params, data) {
  return request({
    url: commonApi.searchPage,
    method: 'post',
    params,
    data
  })
}
