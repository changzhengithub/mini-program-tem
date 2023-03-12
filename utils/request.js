/**
 * @description 请求接口封装
 * @author changz
 * */ 

const BASE_URL = 'https://api.itops.yunsee.cn';
let hasInvalid = false; // token失效，不同地方多次调用此变量也可以被访问

/**
 * @description 请求方法封装
 * @desc 错误统一拦截
 * @desc token过期统一处理
 * @desc then里会返回所有的业务状态码，所以不是200的要返回提示
 * @desc catch里只拦截接口请求错误，如404、401、500和fail里的错误
 * 把这些错误统一成一种格式返回提示
 * @param {String} [url] - 请求地址
 * @param {String} [method] - 请求方法
 * @param {Object} [params] - 请求参数 {}
 * @param {String} [loadText] - 加载动画提示，默认无
 * @example request({})
 * @author changz
 * */
function request({url, method, params, loadText}) {
  return new Promise((resolve, reject) => {
    if (loadText) {
      wx.showLoading({
        title: loadText,
      })
    }
    
    let header = {
      'content-type': 'application/json'
    }
    if (wx.getStorageSync('token')) {
      header['Authorization'] = wx.getStorageSync('token');
    }
    
    wx.request({
      url: `${BASE_URL}${url}`,
      method,
      data: params,
      header,
      success(res) {
        wx.hideLoading();
        const { statusCode, data } = res;
        if (statusCode == 200) {
          resolve(data)
        } else if (statusCode == 401) {
          if (hasInvalid) return // 已经有失效跳转到登录
          wx.showToast({
            title: '登录过期',
            icon: 'none',
            duration: 1500
          })
          hasInvalid = true
          // 跳转到登录页
          setTimeout(() => {
            wx.reLaunch({
              url: '/pages/empower/index',
              complete: function() {
                hasInvalid = false
              }
            })
          }, 1500)
        } else {
          reject({
            errMsg: `请求失败：${statusCode}`,
            data: res
          })
        }
      },
      fail(err) {
        wx.hideLoading();
        reject({
          errMsg: err.errMsg,
          data: err
        })
      }
    })
  })
}

export default request