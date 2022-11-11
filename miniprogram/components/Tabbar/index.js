// components/Tabbar/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    "list": [{
        "pagePath": "pages/index/index",
        "text": "首页",
        "iconPath": "../../images/2.jpg",
        "selectedIconPath": "../../images/3.jpg"
      },
      {
        "pagePath": "pages/page_container/index",
        "text": "页面容器",
        "iconPath": "../../images/3.jpg",
        "selectedIconPath": "../../images/4.jpg"
      },
      {
        "pagePath": "pages/animation/index",
        "text": "动画",
        "iconPath": "../../images/3.jpg",
        "selectedIconPath": "../../images/4.jpg"
      }
    ],
    selected: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    select(index) {
      this.setData({
        selected: index
      })
    },
    nav(e) {
      const page = '/' + e.currentTarget.dataset.page;
      wx.navigateTo({
        url: page
      })
    }
  }
})