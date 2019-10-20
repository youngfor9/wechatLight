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
    background:"pages/image/back.jpg",
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
    this.showBackBround();
    if (app.globalData.userInfo) {
      console.info("1");
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.userInfo.nickName!=undefined){
      console.info("2");
      this.setData({
        hasUserInfo: true
      })
    }else if (this.data.canIUse){
      console.info("4");
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        app.globalData.userInfo = res.userInfo
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      console.info("3");
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
  handleUser: function (userInfo){
    if (userInfo) {
      console.info("getUser参数：" + JSON.stringify(userInfo));
      var _this = this;
      var param = {
        "nickName": userInfo.nickName
      };
      wx.request({
        url: 'https://www.taici.site/user/getUser',
        method: 'GET',
        data: param,
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          var restr = JSON.stringify(res);
          console.info("获取user返回结果：" + restr);
          //user已经存在
          if (res.data) {
            var jsonObj = JSON.parse(JSON.stringify(res.data));
            //计算等级
            var score =jsonObj.score;
            var label = app.calculateLabel(core);
            jsonObj.lackScore = app.calculateLack(score);
            jsonObj.label = label;
            jsonObj.cTime = null;
            jsonObj.uTime = null;
            app.globalData.userInfo = jsonObj;
          } else {
            app.saveUser(userInfo);
          }
        },
        fail: function (res) {
          console.log("getUser--fail--");
        }
      })
    }
  },
  //程序启动后调用
  onLaunch: function () {
    this.canIUse();
  },
  getUserInfo: function(e) {
    var info =e.detail.userInfo;
    app.globalData.userInfo = info;
    if (info) {
      this.handleUser(info);
      this.setData({
        userInfo: info,
        hasUserInfo: true
      })
    }
   
  },
  toPlay:function(e){
    var info = this.data.userInfo;
    console.info("info:" + JSON.stringify(info));
    getCurrentPages().pop(),
      wx.redirectTo({
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
