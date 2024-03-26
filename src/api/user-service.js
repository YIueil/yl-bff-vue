import request from '@/utils/request'

const userApi = {
  login: '/orup/login',
  logout: '/orup/logout',
  refreshToken: '/orup/refreshToken',
  register: '/orup/register',
  modifyUser: '/orup/modifyUser',
  delUser: 'orup/delUser',
  delUserByIds: '/orup/delUserByIds',
  suspendUser: '/orup/suspendUser',
  suspendUserByIds: '/orup/suspendUserByIds',
  passwordChange: 'orup/passwordChange',
  phoneNumberChange: 'orup/phoneNumberChange',
  getUserInfo: '/orup/currentUser',
  getAccountSecurityLevel: '/orup/getAccountSecurityLevel',
  getUserRoles: '/orup/roles',
  getUserPermissions: '/orup/permissions',
  getUserFunctions: '/orup/getUserFunctions',
  getApplicationFunctionTree: 'orup/getApplicationFunctionTree',
  sendMailChangeVerifyCode: 'verifyCode/v1/sendMailChangeVerifyCode',
  sendMailChangeLink: 'verifyCode/v1/sendMailChangeLink'
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
export function refreshToken() {
  return request({
    url: userApi.refreshToken,
    method: 'get'
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
    url: userApi.modifyUser,
    method: 'post',
    data
  })
}
export function delUser(params) {
  return request({
    url: userApi.delUser,
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
    url: userApi.passwordChange,
    method: 'post',
    params
  })
}
export function phoneNumberChange(params) {
  return request({
    url: userApi.phoneNumberChange,
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
export function getAccountSecurityLevel() {
  return request({
    url: userApi.getAccountSecurityLevel,
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
    url: userApi.getUserFunctions,
    method: 'get',
    params
  })
}
export function getApplicationFunctionTree(params) {
  return request({
    url: userApi.getApplicationFunctionTree,
    method: 'get',
    params
  })
}
export function sendMailChangeVerifyCode() {
  return request({
    url: userApi.sendMailChangeVerifyCode,
    method: 'post'
  })
}
export function sendMailChangeLink(params) {
  return request({
    url: userApi.sendMailChangeLink,
    method: 'post',
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
  passwordChange,
  phoneNumberChange,
  sendMailChangeVerifyCode,
  sendMailChangeLink,
  refreshToken,
  getAccountSecurityLevel
}
