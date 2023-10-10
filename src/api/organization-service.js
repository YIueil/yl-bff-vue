import request from '@/utils/request'

const organizationApi = {
  getOrg: '/orup/getOrg',
  addOrg: '/orup/addOrg',
  getOrgTree: '/orup/getOrgTree',
  updateOrg: '/orup/updateOrg',
  deleteOrg: '/orup/deleteOrg',
  addOrgUser: '/orup/addOrgUser',
  delOrgUser: '/orup/delOrgUser'
}
const userApi = {
  addUser: '/orup/addUser',
  modifyUser: '/orup/modifyUser',
  deleteUser: '/orup/delUser'
}
// region 用户相关
export function addUser(data) {
  return request({
    url: userApi.addUser,
    method: 'post',
    data
  })
}
export function modifyUser(data) {
  return request({
    url: userApi.modifyUser,
    method: 'post',
    data
  })
}
export function deleteUser(params) {
  return request({
    url: userApi.deleteUser,
    method: 'post',
    params
  })
}
export function addOrgUser(params, data) {
  return request({
    url: organizationApi.addOrgUser,
    method: 'post',
    params,
    data
  })
}
export function delOrgUser(params, data) {
  return request({
    url: organizationApi.delOrgUser,
    method: 'post',
    params,
    data
  })
}
// endregion
// region 机构相关
export function getOrg(params) {
  return request({
    url: organizationApi.getOrg,
    method: 'get',
    params
  })
}
export function addOrg(data) {
  return request({
    url: organizationApi.addOrg,
    method: 'post',
    data
  })
}
export function getOrgTree() {
  return request({
    url: organizationApi.getOrgTree,
    method: 'get'
  })
}
export function updateOrg(data) {
  return request({
    url: organizationApi.updateOrg,
    method: 'post',
    data
  })
}
export function deleteOrg(params) {
  return request({
    url: organizationApi.deleteOrg,
    method: 'post',
    params
  })
}
// endregion
export default {
  addUser,
  modifyUser,
  deleteUser,
  getOrg,
  addOrg,
  addOrgUser,
  delOrgUser,
  getOrgTree,
  updateOrg,
  deleteOrg
}
