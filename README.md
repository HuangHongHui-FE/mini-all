# 小程序技术大杂烩

### sitemap.json文件
用来配置小程序及其页面是否允许被微信索引。
https://developers.weixin.qq.com/miniprogram/dev/framework/sitemap.html

## 性能优化

其他相关优化文档：https://juejin.cn/post/7073792527093989407

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

#### 组件的使用

pageContainerCom组件

##### 组件使用的好处：

- 复用
- 视图样式进行划分，代码更清晰
- 缩小setData的范围，数据变化，重新渲染的的时候仅限当前组件进行渲染，提高视图渲染的效率。

### 动画

animation, wxs页面

#### 实现

- 使用animation对象实现的css动画

- #### 使用页面或组件对象拥有的animate, 实现的关键帧动画.

  https://developers.weixin.qq.com/miniprogram/dev/framework/view/animation.html

- 以滚动事件驱动的响应式动画

- #### 通过wxs脚本实现的样式动画。

  https://developers.weixin.qq.com/miniprogram/dev/framework/view/interactive-animation.html

  一次 touchmove 的响应需要经过 2 次的逻辑层和渲染层的通信以及一次渲染，通信的耗时比较大。此外 setData 渲染也会阻塞其它脚本执行，导致了整个用户交互的动画过程会有延迟。

  本方案基本的思路是减少通信的次数，让事件在视图层（Webview）响应。小程序的框架分为视图层（Webview）和逻辑层（App Service），这样分层的目的是管控，开发者的代码只能运行在逻辑层（App Service），而这个思路就必须要让开发者的代码运行在视图层（Webview) ,当然也会调用setData，逻辑计算在wxs代码里，只是调用次数少了。
  
  
  
  通过evaluate使用:
  
  通过使用[XPath](https://so.csdn.net/so/search?q=XPath&spm=1001.2101.3001.7020)这种查询语言，它可以用来寻找页面中的元素，属性和文本。
  
  
  
  WXS脚本可以通过ownInstance的CallMethod调用页面上的方法
  
  逻辑层可以通过在视图层绑定一个名称形式为change:prop的特别属性，触发对WXS脚本中方法的调用。

### 重渲染与自定义组件的优化

- 将界面功能组件化

- 去掉不必要的数据设置，减少每次setData设置的数据量

- 通过wxs脚本改写组件，让他可以在视图层完成代码逻辑。



### 按需注入（懒加载）

只会注入当前页面会用到的代码

需要的页面，json文件里

```
"lazyCodeLoading": "requiredComponents",
```

会出现这样的提示

```
Lazy code loading is enabled. Only injecting required components.
```

### 初始渲染缓存

render_cache页面。

第一次页面运行时，客户端将第一次页面渲染的结果缓存起来，写入到一个临时的缓存区里面，下次加载这个页面的时候，有缓存的页面就直接展示缓存的页面，下次在真正的页面未加载完成前，先展示这个缓存的页面。空间换时间的优化策略。

缺点：缓存的页面不能进行事件交互。

##### 静态

##### 动态





### 分包

https://developers.weixin.qq.com/miniprogram/dev/framework/subpackages.html

例如主页，tabbar按官方提供的方式配置，tabbar页面也会算进主包大小里。分包的话就自定义tabbar组件

##### 优点

- 减少主包的大小，优化渲染速度，同时避免因包太大而不能上传审核。
- tabbar图标不在仅限于只能使用本地图片。
- 代码中tabbar页面的跳转不用再单独使用wx.switchTab
- tabbar组件本省也可以不放在主包里

注意修改app.json的page配置，跳转注意路径等。

##### tabbar分包

```
"tabBar": {
    "selectedColor": "#FF0000",
    "position": "bottom",
    "borderStyle": "black",
    "backgroundColor": "#F0F8FF",
    "list": [
    {
      "pagePath": "pages/index/index",
      "text": "首页",
      "iconPath": "images/2.jpg",
      "selectedIconPath": "images/3.jpg"
    },
    {
      "pagePath": "pages/page_container/index",
      "text": "页面容器",
      "iconPath": "images/3.jpg",
      "selectedIconPath": "images/4.jpg"
    },
    {
      "pagePath": "pages/animation/index",
      "text": "动画",
      "iconPath": "images/3.jpg",
      "selectedIconPath": "images/4.jpg"
    }
    ]  
  },
```

配置分包，写tabbar组件，定义好list路径，涉及到的页面引入tabbar, js的onready里引入调用·select方法

##### 独立分包

准备在微信群分享传播的页面，适合， 有返回主页的按钮

注意app.wxss样式以及getApp方法

##### 分包预加载





### 占位组件

https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/placeholder.html

### 分包异步化

https://developers.weixin.qq.com/miniprogram/dev/framework/subpackages/async.html

获取其他未加载的分包里面的代码

### 项目插件化

### WebAssembly

js里插入其他语言来，优化计算性能，适合做大块的数据运算，不适合高频的运算（毕竟js链接go也需要时间）

### 异步转同步的编程范式

### 延迟同步请求



首次只加载一页的数据，等到scroll的时候到底部的时候，触发事件加载新的数据

### 数据预拉取

小程序启动时，微信异步调用开发者设置的云函数或数据接口，拿到数据后，在发给小程序

https://developers.weixin.qq.com/miniprogram/dev/framework/ability/pre-fetch.html

### 周期性更新

https://developers.weixin.qq.com/miniprogram/dev/framework/ability/background-fetch.html

用户未打开小程序的情况下，也能从服务器提前拉取数据，当用户打开小程序时可以更快地渲染页面，减少用户等待时间，增强在弱网条件下的可用性。

### 数据请求的优化

we.request:

- enableCache, 开启缓存内容，想同的请求优先读取本地的内容
- enableHttp2, 开启http2。
- enableQuic，开启quic第三代协议
- enableHttpDNS,是否开启HttpDNS服务， 与httpDNS服务商的ServiceId参数一起使用，防止DNS劫持 

### 代码依赖分析

无依赖文件一般可以删除了

使用packOptions.ignore选项忽略或添加目录

### wxss优化

自定义的单击态按钮

### gulp删除无用的代码样式

```
npm install gulp -g
npm install --save-dev gulp gulp-cleanwxss
```

tool文件夹下编写tools配置

### 脚本优化技巧

clear_timer

- 组件定时器及时清除，onhide也及时清除
- wx.onXXX全局监听的事件，也要进行反监听
- 全局appjs定义的数据，及时清除
- 不准备渲染的数据不放在data里，
- 强制更新：虚拟列表
  - this.ctx.forceUpdate  // 强制重新渲染
  - this.ctx.update(index, [item])  // 下标与更新后的数据， ctx



### 细节

事件绑定使用catchtap自动忽略冒泡，避免不必要的事件触发

### 注意

单个代码包不超过2MB,总包大小不超过20MB即可。

主包操作2mb不能进行上传了，单页面建议html节点不超过1000个。

createSelectorQuery.select。





主页都应被尽快看到，可以把其他页面都设置分包，主页里面的组件也可以设置分包，然后进行分包异步化

- app.json: 项目运行配置文件
- project.config.json: 项目开发配置文件
- project.private.config.json: 项目私有开发配置文件
