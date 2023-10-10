import request from '@/utils/request'

const userApi = {
  login: '/orup/login',
  logout: '/orup/logout',
  register: '/orup/register',
  modifyUser: '/orup/modifyUser',
  delUser: 'orup/delUser',
  delUserByIds: '/orup/delUserByIds',
  suspendUser: '/orup/suspendUser',
  suspendUserByIds: '/orup/suspendUserByIds',
  passwordChange: 'orup/passwordChange',
  getUserInfo: '/orup/currentUser',
  getUserRoles: '/orup/roles',
  getUserPermissions: '/orup/permissions',
  getApplicationFunctionTree: 'orup/getApplicationFunctionTree'
}
export function login(params) {
  return request({
    url: userApi.login,
    method: 'post',
    params
  })
}
export function logout() {
  return request({
    url: userApi.logout,
    method: 'post'
  })
}
export function register(data) {
  return request({
    url: userApi.register,
    method: 'post',
    data
  })
}
export function modifyUser(data) {
  return request({
    url: userApi.register,
    method: 'post',
    data
  })
}
export function delUser(params) {
  return request({
    url: userApi.register,
    method: 'post',
    params
  })
}
export function delUserByIds(data) {
  return request({
    url: userApi.delUserByIds,
    method: 'post',
    data
  })
}
export function suspendUser(params) {
  return request({
    url: userApi.suspendUser,
    method: 'post',
    params
  })
}
export function suspendUserByIds(data) {
  return request({
    url: userApi.suspendUserByIds,
    method: 'post',
    data
  })
}
export function passwordChange(params) {
  return request({
    url: userApi.register,
    method: 'post',
    params
  })
}
export function getUserInfo() {
  return request({
    url: userApi.getUserInfo,
    method: 'get'
  })
}
export function getUserRoles() {
  return request({
    url: userApi.getUserRoles,
    method: 'get'
  })
}
export function getUserPermissions() {
  return request({
    url: userApi.getUserPermissions,
    method: 'get'
  })
}
export function getUserFunctions(params) {
  return request({
    url: userApi.getApplicationFunctionTree,
    method: 'get',
    params
  })
}
export default {
  login,
  logout,
  register,
  modifyUser,
  delUser,
  delUserByIds,
  suspendUser,
  suspendUserByIds,
  passwordChange
}
