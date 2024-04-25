import request from '@/utils/request'

const appApi = {
  getAllApplicationList: '/orup/getAllApplicationList',
  addApplication: '/orup/addApplication',
  modifyApplication: '/orup/modifyApplication',
  delApplication: '/orup/delApplication',
  addApplicationManager: '/orup/addApplicationManager',
  getApplicationFunctionTree: '/orup/getApplicationFunctionTree',
  addApplicationFunction: '/orup/addApplicationFunction',
  updateApplicationFunction: '/orup/modifyApplicationFunction',
  delApplicationFunction: '/orup/delApplicationFunction',
  applicationAuthorization: '/orup/applicationAuthorization',
  updateApplicationStatus: '/orup/updateApplicationStatus'
}

export function getAllApplicationList() {
  return request({
    url: appApi.getAllApplicationList,
    method: 'get'
  })
}
export function addApplication(data) {
  return request({
    url: appApi.addApplication,
    method: 'post',
    data
  })
}
export function modifyApplication(data) {
  return request({
    url: appApi.modifyApplication,
    method: 'post',
    data
  })
}
export function delApplication(params) {
  return request({
    url: appApi.delApplication,
    method: 'post',
    params
  })
}
export function addApplicationManager(params, data) {
  return request({
    url: appApi.addApplicationManager,
    method: 'post',
    params,
    data
  })
}
export function getApplicationFunctionTree(params) {
  return request({
    url: appApi.getApplicationFunctionTree,
    method: 'get',
    params
  })
}
export function addApplicationFunction(data) {
  return request({
    url: appApi.addApplicationFunction,
    method: 'post',
    data
  })
}
export function updateApplicationFunction(data) {
  return request({
    url: appApi.updateApplicationFunction,
    method: 'post',
    data
  })
}
export function delApplicationFunction(params) {
  return request({
    url: appApi.delApplicationFunction,
    method: 'post',
    params
  })
}
export function applicationAuthorization(params, data) {
  return request({
    url: appApi.applicationAuthorization,
    method: 'post',
    params,
    data
  })
}
export function updateApplicationStatus(params) {
  return request({
    url: appApi.updateApplicationStatus,
    method: 'post',
    params
  })
}
export default {
  getAllApplicationList,
  addApplication,
  modifyApplication,
  delApplication,
  addApplicationManager,
  getApplicationFunctionTree,
  addApplicationFunction,
  updateApplicationFunction,
  delApplicationFunction,
  applicationAuthorization,
  updateApplicationStatus
}
