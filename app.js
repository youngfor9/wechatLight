//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
  },
  exitGame: function (e) {
    wx.switchTab({
      url: '../index/index'
    })
  },
  //计算等级
  //等级划分 素人（0），群众演员（10），电影演员（30），影星（100），影帝（影后）（200），骨灰级影帝（影后）（500）
  calculateLabel: function (score, gender){
    var name ="帝";
    if(gender==2){
      name="后";
    }
    var arr = [0 ,100 ,300,1000, 2000,10000];
    var labels = ["素人", "群众演员", "电影演员", "影" + name, "骨灰级影" + name, "终身影" + name];
    var len = arr.length;
    for (var i = 0; i<len;i++) {
      if (arr[i] > score){
        return labels[i-1];
         }
     }
    return "终身影" + name;
    },
  calculateLack: function (score, gender) {
    var arr = [0, 100, 300, 1000, 2000, 10000];
    var len = arr.length;
    for (var i = 0; i < len; i++) {
      if (arr[i] > score) {
        return arr[i]-score ;
      }
    }
    return 0;
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
      duration: 1000,
      timingFunction: 'ease',
      delay: delay
    });
    //考虑到还需要隐藏掉当天之前的卡片，做如下判断来赋予不同的动画效果
    if (isUp == 'down') {
      animation.translateY(0).opacity(opacity).step().translateY(-80).step();
    } else if (isUp == 'up') {
      animation.translateY(0).opacity(opacity).step().translateY(-140).opacity(0).step()
    } else {
      animation.translateY(0).opacity(opacity).step()
    }
    let params = ''
    params = animation.export()
    return params
  }, 
 
  saveUser: function (userInfo) {
    console.info("saveuser参数：" + JSON.stringify(userInfo));
    var _this = this
    wx.request({
      url: 'https://www.taici.site/user/saveUser',
      method: 'POST',
      data: userInfo,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var restr = JSON.stringify(res);
        console.info("saveUser返回数据：" + restr);
        var jsonObj = JSON.parse(restr);
      },
      fail: function (res) {
        console.log("saveUser--fail--");
      }
    })
  },
})