import request from '@/utils/request'

// const organizationApi = {}
const userApi = {
  addUser: '/orup/addUser',
  modifyUser: '/orup/modifyUser'
}
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
export default {
  addUser,
  modifyUser
}
