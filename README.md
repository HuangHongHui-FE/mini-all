# 小程序技术大杂烩

### sitemap.json文件
用来配置小程序及其页面是否允许被微信索引。
https://developers.weixin.qq.com/miniprogram/dev/framework/sitemap.html

## 性能优化

##### APP生命周期

```
onLaunch: 监听小程序初始化
onshow: 监听小程序启动或者切到前台
onHide: 监听小程序切后台
```

##### page生命周期

```
onLoad: 监听页面加载
onShow: 监听页面显示
onReady: 监听页面初次渲染完成
onHide: 监听页面隐藏
onUnload: 监听页面卸载
```

### 启动中优化

- 代码注入阶段

- 合适的生命周期做合适的事件

  ```
  请求数据放在哪
  onUnload：清除定时器，以wx.onXXX这样开头的全局监听，以及与全局对象有关的事件监听，全部移除。
  ```

- 数据预拉取和周期性更新机制

- 初始渲染缓存机制

### 运行时优化

- 使用wxs脚本，在视图层完成事件处理

- 重渲染机制，wxml节点越少，嵌套层级越少越好

- 允许开发者另开worker线程，并发执行任务

- 分页渲染，使用虚拟dom

- 使用缓存

- 启用http2

- 原生的context节点

  ```
  原生组件：map,video,canvas等，可以通过selectorQuery查询到原生节点，利用原生节点直接操作和更新视图，绕过底层native层的数据中转
  ```

- 本地图片上云，使用webp

### 项目诊断

- memory面板
- js profiler面板
- 体验评分面板
- memory面板

### 双线程运行机制

视图层：

native底层接口：(weixinJSBridge), 

逻辑层：js



### 骨架屏

##### 使用操作

在工具的下方：...   生成骨架屏

在代码中引入给的wxml, wxss， 注意添加loading变量,，以及v-if, v-else判断数据渲染完毕隐藏骨架屏

##### 作用

不会减少首屏渲染时间

##### 注意

不要直接修改生成的骨架屏代码

要去project.config.json（项目开发配置文件内）修改，然后重新生成骨架屏。

```
{
	"skeleton-config": {
		"global": {
			...
		}
	},
	"pages": {
		"index/pages/index/index": {
			"backgroundColor": "#c4eefd"
		}
	}
}
```

### 虚拟列表

优化首屏，以及滑动浏览更加流畅

##### recycle-view

基于scroll-view的自定义组件，recycle-view, recycle-item

会多渲染前后两个屏幕，避免白屏

##### 特点

- 结合滚动事件实现分页加载数据
- 默认开启了防抖节流
- 预留插槽，方便定制业务。

##### 原理

最外层给定一个固定的高度，然后设置纵向`Y轴`滚动，然后每个元素的父级设置相对定位，设置真实展示数据的高度，根据可视区域和item高度计算可视区显示的数目。

当滚动条上滑时，计算出滚动的距离`scrollTop`，通过滚动的高度和item的高度计算出当前起始索引

根据起始数据索引以及可视区可以显示的item数目计算出结尾索引， 最后根据起始索引与结束索引渲染可视区域

滑动的是数据，不是组件。

组件只需要实例化一次，通过改变组件数据，渲染不同的内容。

##### demo:

index页面
https://developers.weixin.qq.com/miniprogram/dev/platform-capabilities/extended/component-plus/recycle-view.html
下载完npm去，工具 -> 构建npm

### 页面容器

可以防止例如有弹出框时，手机滑动返回，直接退出了小程序。

##### 基本使用

pageContainer页面

##### 组件的使用

pageContainerCom组件









### 注意

主包操作2mb不能进行上传了，单页面建议html节点不超过1000个



