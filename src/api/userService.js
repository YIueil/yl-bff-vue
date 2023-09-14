import request from '@/utils/request'

const userApi = {
  login: '/orup/login',
  logout: '/orup/logout',
  register: '/orup/register',
  modifyUser: '/orup/modifyUser',
  delUser: 'orup/delUser',
  suspendUser: '/orup/suspendUser',
  passwordChange: 'orup/passwordChange',
  getUserInfo: '/orup/currentUser',
  getUserRoles: '/orup/roles',
  getUserPermissions: '/orup/permissions'
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
export function suspendUser(params) {
  return request({
    url: userApi.register,
    method: 'post',
    params
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
export default {
  login,
  logout,
  register,
  modifyUser,
  delUser,
  suspendUser,
  passwordChange
}
