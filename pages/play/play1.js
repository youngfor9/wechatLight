// pages/play/play1.js
const content = '\n三年又三年'
var process = require("../play/process.js");
const autoId = "A";
const score = 0;
const ansNum = 3;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    content: content,
    anslist: [{
        id: 1,
        letter: "A",
        content: "鬼子来了"
      },
      {
        id: 2,
        letter: "B",
        content: "精武门"
      },
      {
        id: 3,
        letter: "C",
        content: "斗牛"
      },
      {
        id: 4,
        letter: "D",
        content: "神话"
      }
    ],
    titleNum: 1,
    res: ["A", "A", "A"],
    score: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var param = {
      "did": 10
    }
    var _this = this
    wx.request({
      url: 'https://47.98.216.184/dialogue/selectDialogueById',
      method: 'GET',
      data: param,
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        console.info("已经请求了：" + res);
        var restr = JSON.stringify(res);
        var rejson = JSON.parse(restr);
        _this.setData({
          'content': rejson.data.dContent
        })
      },
      fail: function(res) {
        console.log("--fail--");
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.countDown();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  exitGame: function(e) {
    wx.switchTab({
      url: '../index/index'
    })
  },
  toScore: function(score) {
    console.info("---" + score);
    wx.redirectTo({
      url: '../res/res?score=' + score
    })
  },
  showNextQuestion:function(){
    this.setData({
      titleNum: this.data.titleNum + 1,
    })
    this.countDown();
  },
  nextQuestion: function(e) {
    console.info(e.currentTarget.id);
    this.showCount(e.currentTarget.id);
  },
  showCount: function(id) {
    var titleSort = this.data.titleNum;
    console.info("--show--" + titleSort);
    if (titleSort < this.data.res.length + 1 && id == this.data.res[titleSort - 1]) {
      this.data.score = this.data.score + 10;
    }
    if (titleSort >= ansNum) {
      this.toScore(this.data.score);
    } else {
      this.showNextQuestion();
    }
  },

  countDown: function() {
    var _this = this;
    var step = 1, //计数动画次数
      num = 0, //计数倒计时秒数（n - num）
      start = 1.5 * Math.PI, // 开始的弧度
      end = -0.5 * Math.PI, // 结束的弧度
      time = null; // 计时器容器

    var animation_interval = 1000, // 每1秒运行一次计时器
      n = 1; // 当前倒计时为10秒
    // 动画函数
    function animation() {
      if (step <= n) {
        end = end + 2 * Math.PI / n;
        ringMove(start, end);
        step++;
      } else {
        clearInterval(time);
        if (_this.data.titleNum < ansNum + 1) {
          _this.showCount(autoId);
        }
      }
    };
    // 画布绘画函数
    function ringMove(s, e) {
      var context = wx.createCanvasContext('secondCanvas')

      var gradient = context.createLinearGradient(200, 100, 100, 200);
      gradient.addColorStop("0", "#1cc955");
      gradient.addColorStop("0.5", "#1cc955");
      gradient.addColorStop("1.0", "#1cc955");

      // 绘制圆环
      context.setStrokeStyle('#1cc955')
      context.beginPath()
      context.setLineWidth(8)
      context.arc(42, 42, 30, s, e, true)
      context.stroke()
      context.closePath()

      // 绘制倒计时文本
      context.beginPath()
      context.setLineWidth(1)
      context.setFontSize(30)
      context.setFillStyle('#1cc955')
      context.setTextAlign('center')
      context.setTextBaseline('middle')
      context.fillText(n - num + '', 42, 42, 30)
      context.fill()
      context.closePath()

      context.draw()

      // 每完成一次全程绘制就+1
      num++;
    }
    // 倒计时前先绘制整圆的圆环
    ringMove(start, end);
    // 创建倒计时
    time = setInterval(animation, animation_interval);
  }
})