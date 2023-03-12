//app.js
App({
  globalData: {
    isLogin: false // 是否登录
  },
  onLaunch: function () {
    // 版本更新
    const updateManager = wx.getUpdateManager()
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好了，请点击确定重启应用',
        showCancel: false,
        success(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })

    // 权限判断
    this.checkLogin()
  },


  // 检查是否登录
  checkLogin() {
    const token = wx.getStorageSync('token');
    if (token) {
      this.globalData.isLogin = true;
    } else {
      wx.clearStorageSync();
    }
  }
})