Page({
  data: {
    ls: []
  },

  onReady() {
    this.setInitialRenderingCache({
      // 这里的数据会与data中的数据结合，来共同渲染页面
      // 动态缓存的数据
      ls: [1,2,3,4,5,6]
    })
  },
})