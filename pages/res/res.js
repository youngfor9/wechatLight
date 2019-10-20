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
    label: "未登录",
  //  res_image: "pages/res/back.jpg",
    txtImage: "pages/image/play3.jpg",
    animationData: {},
    score:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    this.init_animation();
    // this.rotateThenScale();
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
  rePlay: function (e) {
    getCurrentPages().pop(),
      wx.redirectTo({
        url: '../play/play1'
      })
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
  toHome:function(){
    wx.switchTab({
      url: '../index/index'
    })
  },
  init_animation: function () {
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })

    this.animation = animation

    animation.scale(1.5, 1.5).rotate(30).step()

    this.setData({
      animationData: animation.export()
    })

    setTimeout(function () {
      animation.translate(30).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 500)
  },
//获取用户信息
  setUser:function (userInfo) {
    var _this = this;
    var param ={
      "nickName":userInfo.nickName
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
        if(res.data){
          var jsonObj = JSON.parse(JSON.stringify(res.data));
          //设置全局变量user
          jsonObj.lastScore = _this.data.score;
          jsonObj.score = _this.data.score + jsonObj.score ;
          //计算等级
          var label = app.calculateLabel(jsonObj.score);
          console.info("--label--" + label);
          console.info("--score--"+score);
          jsonObj.label = label;
          jsonObj.cTime=null;
          jsonObj.uTime=null;
          _this.setData({
            'label': label
          })
          //更新userInfo
          app.globalData.userInfo = jsonObj;
          //保存user
          app.saveUser(jsonObj);
        //user不存在
        }else{
          userInfo.lastScore = _this.data.score;
          userInfo.score = _this.data.score;
          app.saveUser(userInfo);
        }
      },
      fail: function (res) {
        console.log("--fail--");
      }
    })
  }
})