// components/ClearTimer/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  // 组件自身的生命周期
  lifetimes: {},

  // 组件所在页面的生命周期
  pageLifetimes: {
    hide() {
      this.stop()  // 在页面跳转或者转入后台隐藏时，停止定时器
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    timer: null
  },

  /**
   * 组件的方法列表
   */
  methods: {
    start() {
      this.timer = setInterval(() => {
        console.log('定时器ing')
      }, 1000)
    },
    stop() {
      if (this.timer) {
        clearInterval(this.timer);
      }

      // if (this.worker) {
      //   this.worker.terminate();
      //   this.worker = null
      // }
    }
  }
})