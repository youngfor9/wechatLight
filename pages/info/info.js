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
    background: "pages/image/background.jpg",
    mostScore:10,
    rank:5,
    lackScore:10,
    totalScore:100,
    textHide:true,
  },
  onLoad:function(){
    this.showBackBround();
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  confirmDialog: function () {
    var _this =this;
    wx.showModal({
      content: '请先登录',
      success(res) {
        if (res.confirm) {
          wx.switchTab({
            url: '../index/index'
          })
        } else if (res.cancel) {
          wx.switchTab({
            url: '../index/index' 
          })
        }
      }
    })
  },
  onShow: function () {
   var  _this =this;
    console.info("666"+app.globalData.userInfo);
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
        textHide:false
      })
    } else if (this.data.canIUse) {
      _this.confirmDialog();
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
          textHide: false
        })
      }
    } else {
      _this.confirmDialog();
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  showBackBround: function () {
    var that = this;
    let bgImage = wx.getFileSystemManager().readFileSync(that.data.background, 'base64')
      ;
    that.setData({
      'background': 'data:image/jpg;base64,' + bgImage
    });
  }
})
