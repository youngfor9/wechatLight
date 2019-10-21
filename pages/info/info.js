//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    userInfo: null,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    mode: 'scaleToFill',
   // background: "pages/image/background.jpg",
    lastScore:0,
    label: "未出道",
    lackScore:0,
    totalScore:0,
    textHide:true,
    dialogue:"每一天都是这样度过的吗？",
    rankStr:""
  },
  onLoad:function(){
    //this.showBackBround();
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../rankList/rank'
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
      console.info(99);
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
      console.info(22);
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
    _this.showInfo();
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  // showBackBround: function () {
  //   var that = this;
  //   let bgImage = wx.getFileSystemManager().readFileSync(that.data.background, 'base64')
  //     ;
  //   that.setData({
  //     'background': 'data:image/jpg;base64,' + bgImage
  //   });
  // },
  showInfo:function(){
    var hasUser = this.data.hasUserInfo;
    console.info("hasUser:"+hasUser);
    if (hasUser){
      var userInfo = app.globalData.userInfo;
      var total = userInfo.score;
      var lackScore = userInfo.lackScore;
      if (!userInfo.lackScore){
        lackScore = app.calculateLack(total);
        userInfo.lackScore= lackScore;
        app.globalData.userInfo=userInfo;
      }
      console.info("userInfo.userInfo" + JSON.stringify(userInfo));
      var sortStr = "";
      var rank = userInfo.rank;
      console.info("*******rank********" + rank);
      if (rank ){
        var rankStr = "20后"
          if(rank < 21){
                rankStr="第 "+rank+" 名"
          }
        this.setData({
          rankStr:rankStr
        })
      }
      this.setData({
        lastScore: userInfo.lastScore,
        label: userInfo.label,
        totalScore: userInfo.score,
        lackScore: lackScore,
        rank: userInfo.rank
      }) 
    }
  }
})
