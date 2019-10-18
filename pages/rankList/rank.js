// pages/rankList/rank.js
Page({

  /**
   * 页面的初始数据
   */
  _this: this,
  data: {
    animations: [{}, {}],
    medals: [],
    jinIcon: "pages/image/jin.jpg",
    yinIcon: "pages/image/yin.jpg",
    tongIcon: "pages/image/tong.jpg",
    
    ranks:["刘德华","胡歌","成龙","谢霆锋","周星驰"]
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
    this.showImg();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var _this = this;
    var animations = this.data.animations;
    for (let i = 0; i < animations.length; i++) {
      if (i == 0) {
        animations[i].animation = _this.animationShow(_this, 0.5, 0, 'up')
      } else {
        animations[i].animation = _this.animationShow(_this, 1, (i + 1) * 10, 'down')
      }
    }
    _this.setData({
      animations: animations
    })
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
  /**
* 动画实现
* @method animationShow
* @param {that} 当前卡片
* @param {opacity} 透明度
* @param {delay} 延迟
* @param {isUp} 移动方向
*/
  animationShow: function (that, opacity, delay, isUp) {
    let animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
      delay: delay
    });
   //考虑到还需要隐藏掉当天之前的卡片，做如下判断来赋予不同的动画效果
    if (isUp == 'down') {
      animation.translateY(0).opacity(opacity).step().translateY(-20).step();
    } else if (isUp == 'up') {
      animation.translateY(0).opacity(opacity).step().translateY(-40).opacity(0).step()
    } else {
      animation.translateY(0).opacity(opacity).step()
    }
    let params = ''
    params = animation.export()
    return params
  }, 
  showImg: function () {
    var that = this;
    let jinIcon = wx.getFileSystemManager().readFileSync(that.data.jinIcon, 'base64')
    let yinIcon = wx.getFileSystemManager().readFileSync(that.data.yinIcon, 'base64')
    let tongIcon = wx.getFileSystemManager().readFileSync(that.data.tongIcon, 'base64')
    that.setData({
      'jinIcon': 'data:image/jpg;base64,' + jinIcon,
      'yinIcon': 'data:image/jpg;base64,' + yinIcon,
      'tongIcon': 'data:image/jpg;base64,' + tongIcon,
      'medals': ['data:image/jpg;base64,' + jinIcon, 'data:image/jpg;base64,' + yinIcon, 'data:image/jpg;base64,' + tongIcon]
    });
  },

})