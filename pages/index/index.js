// index.js

import { menusApi } from '../../api/index'

const app = getApp();
const { isLogin } = app.globalData;

Page({
  data: {
    isLogin,
    initData: null
  },
  
  onLoad: function () {
    if (this.data.isLogin) {
      this.getInitData()
    }
  },

  getInitData() {
    const that = this
    menusApi({}, '加装中...')
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
        const data = res.data
        that.setData({
          initData: data
        })
      }).catch((err) => {
        console.log(err)
        wx.showToast({
          title: err.errMsg,
          icon: 'none',
          duration: 2000
        })
      })
  },

  // 去登录
  getLoginInfo() {
    if (this.data.isLogin) return
    wx.navigateTo({
      url: '/pages/empower/index'
    })
  }
})
