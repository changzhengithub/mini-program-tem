/**
 * 权限判断
 * 在需要做权限判断的页面引入
 * 如果返回true则已登录，则进行已登录的操作，没有登录跳转都登录页
 * 当然也可以进行页面拦截，没有登录直接返回上一页
 * 判断登录页也可以使用接口判断，因为是异步所以要使用async await 等待获取
 * */ 

// 检查是否登录
function checkLogin() {
  let isLogin = false
  const token = wx.getStorageSync('token');
  if (token) {
    isLogin = true;
  } else {
    wx.clearStorageSync();
  }
  return isLogin
}

module.exports = {
  checkLogin
}