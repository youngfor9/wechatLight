// pages/play/play1.js
const content = '\n三年又三年'
var process = require("../play/process.js");
const autoId = "A";
const score = 0;
const ansNum = 3;
const titleNum = 0;
const time = null;
var app = getApp();
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
    score: 0,
    contentArr: null,
    time: null,
    view: "pages/image/view1.gif",
    car: "pages/image/car.jpg"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var param = {
      "num": 3
    }
    var _this = this
    wx.request({
      url: 'https://47.98.216.184/dialogue/getDialogueInfos',
      method: 'GET',
      data: param,
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        var restr = JSON.stringify(res);
        console.info("已经请求了：" + restr);
        var jsonObj = JSON.parse(restr);
        _this.setData({
          'contentArr': jsonObj.data,
          content: jsonObj.data[0].info.content,
          anslist: jsonObj.data[0].ans
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
    this.showBackBround();
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
    app.exitGame();
  },
  toScore: function(score) {
    console.info("---" + score);
    wx.redirectTo({
      url: '../res/res?score=' + score
    })
  },
  showNextQuestion: function() {
    this.setData({
      titleNum: this.data.titleNum + 1,
    })
    //内容
    console.info("content.size:" + this.data.titleNum);
    var contentJson = this.data.contentArr[this.data.titleNum - 1];
    console.info("contentJson:" + contentJson);
    this.setData({
      content: contentJson.info.content,
      anslist: contentJson.ans
    })
    this.countDown();
  },
  nextQuestion: function(e) {
    console.info(e.currentTarget.id);
    clearInterval(this.data.time);
    this.judgeSelect(e.currentTarget.id);
  },
  //显示选择题
  judgeSelect: function(id) {
    var titleSort = this.data.titleNum;
    console.info("--show--" + titleSort);
    if (titleSort < this.data.res.length + 1 && id == this.data.res[titleSort - 1]) {
      this.data.score = this.data.score + 10;
    }
    if (titleSort >= ansNum) {
      //计算分数
      this.toScore(this.data.score);
    } else {
      //显示下一题
      this.showNextQuestion();
    }
  },

  countDown: function() {
    var time = this.data.time;
    var _this = this;
    var v=10,step = 10, //计数动画次数
      num = 0, //计数倒计时秒数（n - num）
      start = 1.5 * Math.PI, // 开始的弧度
      end = -0.5 * Math.PI; // 结束的弧度
    // 计时器容器
    var animation_interval = 125, // 每1秒运行一次计时器
      n = 3; // 当前倒计时为10秒
    function animation() {
      if (step <= v * (n + 1)) {
        end = end + 2 * Math.PI / (v * n);
        ringMove(start, end);
        step++;
      } else {
        //自动显示下一题
        clearInterval(_this.data.time);
        console.info("titleNum:" + _this.data.titleNum);
        if (_this.data.titleNum < ansNum + 1 ) {
          _this.judgeSelect(autoId);
        }
      }
    };
    // 画布绘画函数
    function ringMove(s, e) {
      var context = wx.createCanvasContext('secondCanvas')
      // 绘制圆环
      context.setStrokeStyle('#1cc955')
      context.beginPath()
      context.setLineWidth(8)
      context.setLineCap('round')
      context.arc(42, 42, 30, s, e, true)
      context.stroke()
      context.closePath()
      console.info("n:"+n);
      // 绘制倒计时文本
      context.beginPath()
      context.setLineWidth(1)
      context.setFontSize(30)
      context.setFillStyle('#1cc955')
      context.setTextAlign('center')
      context.setTextBaseline('middle')
      context.fillText(n - parseInt(num / v) + '', 42, 42, 30)
      context.fill()
      context.closePath()
      // 每完成一次全程绘制就+1
      num++;
      context.draw()
    }
    // 倒计时前先绘制整圆的圆环
    ringMove(start, end);
    // 创建倒计时
    //time = setInterval(animation, animation_interval);
    _this.setData({
      time: time
    })
  },
  showBackBround: function () {
    var that = this;
    let bgImage = wx.getFileSystemManager().readFileSync(that.data.view, 'base64')
    let carImage = wx.getFileSystemManager().readFileSync(that.data.car, 'base64')
    that.setData({
      'view': 'data:image/jpg;base64,' + bgImage,
      'car': 'data:image/jpg;base64,' + carImage
    });
  }
})