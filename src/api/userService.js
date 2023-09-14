import request from '@/utils/request'

const userApi = {
  login: '',
  logout: '',
  getUserInfo: '/orup/currentUser',
  getUserRoles: '/orup/getUserRole',
  getUserPermissions: '/orup/getUserRole'
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
export default {}
