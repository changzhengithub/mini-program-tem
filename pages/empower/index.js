// index.js

import { miniLoginApi } from '../../api/login'

Page({
  data: {
    code: '' // 登录凭证
  },
  
  onLoad: function () {
    const that = this
    // 获取登录凭证
    wx.login({
      success(res) {
        const { code } = res
        console.log(code)
        that.setData({
          code
        }, () => {
          that.getAuthSetting()
        })
      }
    })
  },

  /**
   * 获取用户的当前设置。
   * 返回值中只会出现小程序已经向用户请求过的权限。
   * */ 
  getAuthSetting() {
    const that = this;
    wx.getSetting({
      success(res) {
        console.log(res)
        const { authSetting } = res
        if (authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function(res) {
              console.log(res)
              // 获取加密算法和加密数据
              const { encryptedData, iv } = res
              that.userLogin(encryptedData, iv)
            }
          })
        } else {
          
        }
      }
    })
  },

  // 登录
  userLogin(encryptedData, iv) {
    const that = this
    const { code } = this.data
    const params = {
      code,
      encryptedData,
      iv
    }
    miniLoginApi(params, '鉴权中...')
      .then((res) => {
        if (res.code !== 200) {
          wx.showToast({
            title: res.msg,
            icon: 'none',
            duration: 2000
          })
          return
        }
        console.log(res)
        const { data, token } = res
        wx.setStorageSync('token', token)
        wx.setStorageSync('userInfo', data)
        // 登录成功跳转到首页
        wx.navigateTo({
          url: '/pages/index/index'
        })
      }).catch((err) => {
        console.log(err)
        wx.showToast({
          title: err.errMsg,
          icon: 'none',
          duration: 2000
        })
      })
  }
})