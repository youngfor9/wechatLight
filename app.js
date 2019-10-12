//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    rank:""
  },
  exitGame: function (e) {
    wx.switchTab({
      url: '../index/index'
    })
  },
  //计算等级
  //等级划分 素人（0），群众演员（10），电影演员（30），影星（100），影帝（影后）（200），骨灰级影帝（影后）（500）
  calculateRank: function (score, gender){
    var name ="帝";
    if(gender==2){
      name="后";
    }
    var rank_map = new Map();
    rank_map.set(0,"素人");
    rank_map.set(10,"群众演员");
    rank_map.set(30,"电影演员");
    rank_map.set(100, "影" + name);
    rank_map.set(200,"骨灰级影"+name);
     for (var i in rank_map.keys) {
        if(i >= score){
           return rank_map.get(i);
        }
     }
    return "骨灰级影" + name;
    }
})