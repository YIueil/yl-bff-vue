import request from '@/utils/request'

const userApi = {
  getUserInfo: '/bdf-web/orup/currentUser',
  getUserRole: '/bdf-web/orup/getUserRole'
}

export default {
  getUserInfo() {
    return request({
      url: userApi.getUserInfo,
      method: 'get'
    })
  },
  getUserRole() {
    return request({
      url: userApi.getUserRole,
      method: 'get'
    })
  }
}
