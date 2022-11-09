// pages/animation/index.js
Page({
  data: {

  },

  onLoad(options) {

  },

  onReady: function () {
    // 1. 使用animation对象实现的css动画
    this.animation = wx.createAnimation();
  },
  rotate: function () {
    // step() 表示一组动画的完成，可以在一组动画中调用任意多个动画方法
    // 一组动画中的所有动画会同时开始，一组动画完成后才会进行下一组动画
    this.animation.rotate(Math.random() * 720 - 360).step()
    this.setData({
      animation: this.animation.export()
    })
  },
  scale: function () {
    this.animation.scale(Math.random() * 2).step()
    this.setData({
      animation: this.animation.export()
    })
  },
  translate: function () {
    this.animation.translate(Math.random() * 100 - 50, Math.random() * 100 - 50).step()
    this.setData({
      animation: this.animation.export()
    })
  },
  skew: function () {
    this.animation.skew(Math.random() * 90, Math.random() * 90).step()
    this.setData({
      animation: this.animation.export()
    })
  },
  rotateAndScale: function () {
    this.animation.rotate(Math.random() * 720 - 360)
      .scale(Math.random() * 2)
      .step()
    this.setData({
      animation: this.animation.export()
    })
  },
  rotateThenScale: function () {
    this.animation.rotate(Math.random() * 720 - 360).step()
      .scale(Math.random() * 2).step()
    this.setData({
      animation: this.animation.export()
    })
  },
  all: function () {
    this.animation.rotate(Math.random() * 720 - 360)
      .scale(Math.random() * 2)
      .translate(Math.random() * 100 - 50, Math.random() * 100 - 50)
      .skew(Math.random() * 90, Math.random() * 90)
      .step()
    this.setData({
      animation: this.animation.export()
    })
  },
  allInQueue: function () {
    this.animation.rotate(Math.random() * 720 - 360).step()
      .scale(Math.random() * 2).step()
      .translate(Math.random() * 100 - 50, Math.random() * 100 - 50).step()
      .skew(Math.random() * 90, Math.random() * 90).step()
    this.setData({
      animation: this.animation.export()
    })
  },
  reset: function () {
    this.animation.rotate(0, 0)
      .scale(1)
      .translate(0, 0)
      .skew(0, 0)
      .step({
        duration: 0
      })
    this.setData({
      animation: this.animation.export()
    })
  },

  // 关键帧动画
  keyframesBtn1() {
    // this.animate(selector, keyframes, duration, callback)
    this.animate('#container', [{
        opacity: 1.0,
        rotate: 0,
        backgroundColor: '#FF0000'
      },
      {
        opacity: 0.5,
        rotate: 45,
        backgroundColor: '#00FF00'
      },
      {
        opacity: 0.0,
        rotate: 90,
        backgroundColor: '#FF0000'
      },
    ], 5000, function () {
      this.clearAnimation('#container', {
        opacity: true,
        rotate: true
      }, function () {
        console.log("清除了#container上的opacity和rotate属性")
      })
    }.bind(this));
  },


  keyframesBtn2() {
    this.animate('#container', [{
        scale: [1, 1],
        rotate: 0,
        ease: 'ease-out'
      },
      {
        scale: [1.5, 1.5],
        rotate: 45,
        ease: 'ease-in',
        offset: 0.9
      },
      {
        scale: [2, 2],
        rotate: 90
      },
    ], 5000, function () {
      this.clearAnimation('#container', function () {
        console.log("清除了 #container 上的所有动画属性")
      })
    }.bind(this));
  },

  keyframesBtn3() {
    this.animate('#container', [{
      borderRadius: '0',
      borderColor: 'red',
      transform: 'scale(1) translateY(-20px)',
      offset: 0,
    }, {
      borderRadius: '25%',
      borderColor: 'blue',
      transform: 'scale(.65) translateY(-20px)',
      offset: .5,
    }, {
      borderRadius: '50%',
      borderColor: 'blue',
      transform: `scale(.3) translateY(-20px)`,
      offset: 1
    }], 2000, {
      scrollSource: '#scroller',
      timeRange: 2000,
      startScrollOffset: 0,
      endScrollOffset: 85,
    })
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})