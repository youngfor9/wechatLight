// pages/play/play1.js
const score = 0;
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    score: score,
    rank: "影迷",
    base64ImgUrl: "/back.jpeg"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    this.setData({
      score: e.score
    });
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
  exitGame: function (e) {
    app.exitGame();
  },
  getBase64ImageUrl: function () {
    /// 获取到base64Data
    var base64Data = '/back.jpg';
    /// 通过微信小程序自带方法将base64转为二进制去除特殊符号，再转回base64
    base64Data = wx.arrayBufferToBase64(wx.base64ToArrayBuffer(base64Data));
    /// 拼接请求头，data格式可以为image/png或者image/jpeg等，看需求
    const base64ImgUrl = "data:image/png;base64," + base64Data;
    /// 刷新数据
    this.setData({
      base64ImgUrl: base64ImgUrl
    })
  }
})