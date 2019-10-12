// pages/play/play1.js
const score = 0;
var app = getApp();
var data=null;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    data: data,
    rank: "等级需登录才能显示",
  //  res_image: "pages/res/back.jpg",
    txtImage: "pages/image/txt.jpg",
    animationData: {},
    score:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    this.getBase64ImageUrl();
    var data = JSON.parse(e.data)
    console.info("data:" + data);
    this.setData({
      score:data.score,
    });
   var user  =  app.globalData.userInfo;
    if (user){
      this.setUser(user);
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.init_animation();
    this.rotateThenScale();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  exitGame: function (e) {
    app.exitGame();
  },
  getBase64ImageUrl: function () {
    var _this =this;
    /// 通过微信小程序自带方法将base64转为二进制去除特殊符号，再转回base64
    //let bgImage = wx.getFileSystemManager().readFileSync(_this.data.res_image, 'base64')
    //let playImage = wx.getFileSystemManager().readFileSync(_this.data.playView, 'base64')
    let txtImage = wx.getFileSystemManager().readFileSync(_this.data.txtImage, 'base64')

    /// 刷新数据
    _this.setData({
     // res_image: 'data:image/jpg;base64,' + bgImage,
      txtImage: 'data:image/jpg;base64,' + txtImage,
    })
  },
  rotateThenScale: function () {
    this.animation.rotate(360).step()
      .scale(1).step()
    this.setData({ animation: this.animation.export() })
  },
  init_animation: function () {
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })

    this.animation = animation

    animation.scale(2, 2).rotate(45).step()

    this.setData({
      animationData: animation.export()
    })

    setTimeout(function () {
      animation.translate(30).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 1000)
  },
  saveUser:function(userInfo){
    var _this = this
    wx.request({
      url: 'https://47.98.216.184/user/saveUser',
      method: 'POST',
      data: userInfo,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var restr = JSON.stringify(res);
        console.info("已经请求了：" + restr);
        var jsonObj = JSON.parse(restr);
          console.log("--success--");
      },
      fail: function (res) {
        console.log("--fail--");
      }
    })
  },
//获取用户信息
  setUser:function (userInfo) {
    var _this = this;
    var param ={
      "nickName":userInfo.nickName
      };
    wx.request({
      url: 'https://47.98.216.184/user/getUser',
      method: 'POST',
      data: param,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        //user已经存在
        if(res.data){
          var restr = JSON.stringify(res);
          console.info("获取user返回结果：" + restr);
          var jsonObj = JSON.parse(restr);
          //设置全局变量user
          jsonObj.lastScore = _this.data.score;
          jsonObj.score = _this.data.score + jsonObj.score ;
          console.info("jsonObj.score:" + jsonObj.score);
          //计算等级
          var rank = app.calculateRank(jsonObj.score);
          jsonObj.rank = rank;
          //更新userInfo
          app.globalData.userInfo = jsonObj;
          //保存user
          _this.saveUser(jsonObj);
        //user不存在
        }else{
          userInfo.lastScore = _this.data.score;
          userInfo.score = _this.data.score;
          _this.saveUser(userInfo);
        }
      },
      fail: function (res) {
        console.log("--fail--");
      }
    })
  }
})