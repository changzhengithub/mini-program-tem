import request from '../utils/request'

const api = {
  miniLogin: '/api/common/miniLogin'
}

// 登录
export function miniLoginApi(parameter, loadText) {
  return request({
    url: api.miniLogin,
    method: 'POST',
    params: parameter,
    loadText
  })
}