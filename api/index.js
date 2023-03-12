import request from '../utils/request'

const api = {
  menus: '/api/store/menus',
}

// 菜单栏
export function menusApi(parameter, loadText) {
  return request({
    url: api.menus,
    method: 'GET',
    params: parameter,
    loadText
  })
}