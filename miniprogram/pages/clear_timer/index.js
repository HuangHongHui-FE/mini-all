Page({
  data: {
    theme: null
  },
  onLoad(options) {
    console.log("index clearTimer");
    wx.onThemeChange(this.themeChangeHandler);
  },
  onUnload(){
    wx.offThemeChange(this.themeChangeHandler);
  },

  themeChangeHandler({theme}) {
    console.log(`当前主题是${theme}`)
    this.setData({
      theme
    })
  }
})