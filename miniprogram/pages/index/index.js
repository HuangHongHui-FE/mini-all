//index.js
const app = getApp()
const createRecycleContext = require('miniprogram-recycle-view')
Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl'), // 如需尝试获取用户信息可改为false
    ctx: null, // 实例化一次就行

    showPage: false,
    recycleList: [{
        id: 1,
        title: 'pageContainer-page',
        idx: 1,
        path: '../page_container/index',
        image_url: '../../images/01.png'
      },
      {
        id: 2,
        title: 'pageContainer-component',
        idx: 2,
        path: '../page_container_com/index',
        image_url: '../../images/01.png'
      },
      {
        id: 3,
        title: 'animation',
        idx: 3,
        path: '../animation/index',
        image_url: '../../images/01.png'
      },
      {
        id: 4,
        title: 'WXS',
        idx: 4,
        path: '../wxs/pages/index/index',
        image_url: '../../images/01.png'
      },
      {
        id: 5,
        title: 'renderCache',
        idx: 5,
        path: '../render_cache/index',
        image_url: '../../images/01.png'
      },
      {
        id: 6,
        title: 'setData',
        idx: 6,
        path:'../set_data/index',
        image_url: '../../images/01.png'
      },
      {
        id: 7,
        title: 'switch_btn',
        idx: 7,
        path: '../switch_btn/index',
        image_url: '../../images/01.png'
      },
      {
        id: 8,
        title: 'clearTimer',
        idx: 8,
        path: '../clear_timer/index',
        image_url: '../../images/01.png'
      },
      {
        id: 9,
        title: '9',
        idx: 9,
        image_url: '../../images/01.png'
      }
    ]
  },

  onLoad: function () {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true,
      })
    }
  },

  onReady: function () {
    if (!this.ctx) {
      this.ctx = createRecycleContext({
        id: 'recycleId',
        dataKey: 'recycleList',
        page: this,
        itemSize: { // 这个参数也可以直接传下面定义的 this.itemSizeFunc 函数
          width: 162,
          height: 182
        }
      })
    }

    // ctx.append()
    // ctx.update(beginIndex, list)
    // ctx.destroy()


    // tabbar的分包
    this.selectComponent("#tabBar")?.select(0);
  },
  itemSizeFunc: function (item, idx) {
    return {
      width: 162,
      height: 182
    }
  },
  // 虚拟列表滚动事件
  onscroll: function () {
    console.log('aaaa')
  },

  getUserProfile() {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          avatarUrl: res.userInfo.avatarUrl,
          userInfo: res.userInfo,
          hasUserInfo: true,
        })
      }
    })
  },

  onGetUserInfo: function (e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo,
        hasUserInfo: true,
      })
    }
  },


  // 点击每一项跳转页面
  gopage(e) {
    const path = e.currentTarget.dataset.path;
    if(path == '../page_container_com/index'){
      // 第一种
      // this.showPageContainerCom();

      // 第二种
      this.selectComponent("#pageContainerComId").setData({
        show: true
      })
      return
    }
    wx.navigateTo({
      url: path
    })
  },
  
  // 展示组件--通过属性的方式控制显示
  showPageContainerCom(){
    this.setData({
      showPage: true
    })
  },
})