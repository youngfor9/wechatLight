// pages/play/play1.js
const content = '\n三年又三年'
const titleNum =1
Page({
  /**
   * 页面的初始数据
   */
  data: {
    content: content,
      titleNum: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    this.data.titleNum = this.data.titleNum +1,
    this.setData({
       titleNum: this.data.titleNum,
    })
  }
})