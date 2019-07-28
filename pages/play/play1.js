// pages/play/play1.js
const content = '\n三年又三年,郭锦'
const titleNum =1
var process = require("../play/process.js");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    content: content,
    anslist: [{ id: 1, letter: "A", content: "鬼子来了" },
      { id: 2, letter: "B", content: "精武门" },
      { id: 3, letter: "C", content: "斗牛" },
      { id: 4, letter: "D", content: "神话" }],
      titleNum: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var param ={
      "did":1
    }
    process.count();
   var _this =this
    wx.request({
      url: 'https://www.taici.site/dialogue/selectDialogueById',
      method:'GET',
      data:param,
      header:{
        'content-type':'application/json'
      },
      success:function(res){
          console.info("已经请求了："+res);
          var restr = JSON.stringify(res);
          var rejson =JSON.parse(restr);
          _this.setData({
            'content': rejson.data.dContent
          })
      },
      fail:function(res){
        console.log("--fail--");
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    process.drawProgressbg();
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  exitGame:function(e){
    wx.switchTab({
      url: '../index/index'
    })
  },
  nextQuestion:function (e) {
    this.data.titleNum = this.data.titleNum + 1;
    console.info(e.currentTarget.id)
    if(this.data.titleNum>10){
      this.exitGame();
    }
    for (let i = 0; i < this.data.anslist.length; i++) {
      if (e.currentTarget.id == "A") {
        this.data.anslist[i].checked = true;
      }
      else {
        //其他的位置为false
        this.data.anslist[i].checked = false;
      }
    }
  
    this.setData({
       titleNum: this.data.titleNum,
    })
  }
})