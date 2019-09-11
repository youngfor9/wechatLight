//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello-World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    mode: 'scaleToFill',
    background:"pages/image/background.jpg",
    title_image:"pages/image/title.jpg"
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  // 设置转发
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '大家一起来玩猜台词，唤醒沉睡的记忆！',
      path: '/index/index'
    }
  },
  onLoad: function () {
    console.info("user--" + this.data.userInfo.nickName);
    this.showBackBround();
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.userInfo.nickName!=undefined){
      this.setData({
        hasUserInfo: true
      })
    }else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
          })
        }
      })
    }
  },
  //程序启动后调用
  onLaunch: function () {
    this.canIUse();
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    }
   
  },
  toPlay:function(e){
    this.getUserInfo();
    getCurrentPages().pop(),
      wx.navigateTo({
      url:'../play/play1'
    })
  },
  showBackBround:function(){
    var that = this;
    let bgImage = wx.getFileSystemManager().readFileSync(that.data.background, 'base64')
;
    let titleImage =  wx.getFileSystemManager().readFileSync(that.data.title_image, 'base64')
    console
    that.setData({
      'background': 'data:image/jpg;base64,' + bgImage,
      'title_image': 'data:image/jpg;base64,' + titleImage
    });
  }
})
