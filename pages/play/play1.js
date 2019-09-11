// pages/play/play1.js
const content = '\n三年又三年'
var process = require("../play/process.js");
const autoId = 0;
const score = 0;
const ansNum = 3;
const titleNum = 1;
const time = null;
var app = getApp();
var carTime = 3000
var animation ={};
const que_size =3;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    content: content,
    ansIds:[],
    anslist: [
    ],
    titleNum: 1,
    selectIdsRes: "",
    score: 0,
    contentArr: null,
    time: null,
    view: "pages/image/view1.gif",
    car: "pages/image/car.jpg",
    playView: "pages/image/play3.jpg",
    animation: wx.createAnimation(),
    isHide: true
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
          contentArr: jsonObj.data,
          content: jsonObj.data[0].info.content,
          anslist: jsonObj.data[0].ans,
          ansIds: jsonObj.data[0].info.aId
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
    this.animation = wx.createAnimation();
    this.initCar();
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
  ////[{
  //   "que":“这是”，
  //   "ans": 霸王别姬，
  //   "sort":1，
  //   "true":false
  // }]
  toScore: function(score) {
    var arr = this.data.contentArr;
    var sir = this.data.selectIdsRes;
    var sirArr = sir.split(",");
    var data_arr = new Array(); 
    for (var i in arr) {
      var data_map = new Map();
      console.info(i+"----"+arr[i]);
      var aId = arr[i].info.aId;
      data_map.que = arr[i].info.content;
      for (var j = 0, len = arr[i].ans.length; j < len; j++) {
        var ans_obj = arr[i].ans[j];
        var ans_id = ans_obj.id;
        var ans_content = ans_obj.content;
        console.info("res---ans_id:" + ans_id +",aId--"+aId);
        if (ans_id == aId){
          data_map.ans= ans_content;
          data_map.sort= i;
          data_map.true=sirArr[j];
        }
      }
      data_arr.push(data_map);
    }
    console.info("---" + JSON.stringify(data_arr));
    wx.redirectTo({
      url: '../res/res?data=' + JSON.stringify(data_arr)
    })
  },
  showNextQuestion: function(id) {
    var _this= this;
    //内容
    console.info("content.size:" + this.data.titleNum);
    var contentJson = this.data.contentArr[this.data.titleNum];
    console.info("contentJson:" + contentJson);

    this.setData({
      content: contentJson.info.content,
      anslist: contentJson.ans,
      'titleNum': _this.data.titleNum + 1,
    })
    this.countDown();
  },
  nextQuestion: function(e) {
    clearInterval(this.data.time);
    this.judgeSelect(e.currentTarget.id);
  },
  //显示选择题
  judgeSelect: function(id) {
    var sir = this.data.selectIdsRes;
    console.info("sir:" + sir);
    var contentJson = this.data.contentArr[this.data.titleNum - 1];
   var cid= contentJson.info.aId;
    console.info("selectId:"+id+",cid:"+cid);
    var titleSort = this.data.titleNum;
    if (sir!=null){
      sir = sir+(cid == id)+","
    }else{
      sir = (cid == id) + ","
    }
    this.setData({
      selectIdsRes: sir
    })
    if (true) {
      this.data.score = this.data.score + 10;
    }
    if (titleSort >= ansNum) {
      //计算分数
      this.toScore(this.data.score);
    } else {
      //显示下一题
      this.showNextQuestion(id);
    }
  },

  countDown: function() {
    var time = this.data.time;
    var _this = this;
    this.initCar();
    var v = 10,
      step = 10, //计数动画次数
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
        if (_this.data.titleNum < ansNum + 1) {
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
    time = setInterval(animation, animation_interval);
    _this.setData({
      time: time
    })
  },
  showBackBround: function() {
    var that = this;
    let bgImage = wx.getFileSystemManager().readFileSync(that.data.view, 'base64')
    let carImage = wx.getFileSystemManager().readFileSync(that.data.car, 'base64')
    let playImage = wx.getFileSystemManager().readFileSync(that.data.playView, 'base64')
    that.setData({
      'view': 'data:image/jpg;base64,' + bgImage,
      'car': 'data:image/jpg;base64,' + carImage,
      'playView': 'data:image/jpg;base64,' + playImage
    });
  },
  initCar: function() {
    this.resetAnimation();
   this.animation.translateX(300).scale(2).step({
      "duration": carTime,
      "delay":300,
      "timingFunction": "ease"
    })
    this.setData({
      animation: this.animation.export()
    })
    this.seTimer();
  },
  seTimer: function() {
    var that = this;
    var timer = setTimeout(function() {
      that.setData({
        'isHide': false,
      });
    }, 1800);
  },
  resetAnimation: function() {
  var  _this =this
    this.animation.translateX(0).scale(0)
      .step({
        duration: 0
      })
    this.setData({
      animation: this.animation.export(),
      isHide:true,
    })
  }
})