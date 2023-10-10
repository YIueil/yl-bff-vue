import request from '@/utils/request'

const roleApi = {
  getRole: '/orup/getRole',
  addRole: '/orup/addRole',
  getRoleTree: '/orup/getRoleTree',
  updateRole: '/orup/updateRole',
  deleteRole: '/orup/deleteRole',
  addRoleUser: '/orup/addRoleUser',
  delRoleUser: '/orup/delRoleUser'
}
export function getRole(params) {
  return request({
    url: roleApi.getRole,
    method: 'get',
    params
  })
}
export function addRole(data) {
  return request({
    url: roleApi.addRole,
    method: 'post',
    data
  })
}
export function getRoleTree(params) {
  return request({
    url: roleApi.getRoleTree,
    method: 'get',
    params
  })
}
export function updateRole(data) {
  return request({
    url: roleApi.updateRole,
    method: 'post',
    data
  })
}
export function deleteRole(params) {
  return request({
    url: roleApi.deleteRole,
    method: 'post',
    params
  })
}
export function addRoleUser(params, data) {
  return request({
    url: roleApi.addRoleUser,
    method: 'post',
    params,
    data
  })
}

export function delRoleUser(params, data) {
  return request({
    url: roleApi.delRoleUser,
    method: 'post',
    params,
    data
  })
}

export default {
  getRole,
  addRole,
  getRoleTree,
  updateRole,
  deleteRole,
  addRoleUser,
  delRoleUser
}
