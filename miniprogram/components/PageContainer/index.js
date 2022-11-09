// components/PageContainer/index.js.js
Component({
  /**
   * 组件的属性列表, 传递过来的
   */
  properties: {
    showPro: {
      type: Boolean,
      value: false
    }
  },

  // 属性监听
  observers: {
    showPro(value) {
      this.setData({
        show: value
      })
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    show: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    async close(e) {
      const res = await wx.navigateBack().catch(console.log);
      console.log('res--->pageContainerCom', res);
      if(!res || res.errMsg !== 'navigateBack:ok'){
        this.setData({
          show: false
        })
      }
    }
  }
})