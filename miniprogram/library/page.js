const nativePage = Page;

export default function (options) {
  let {
    onLoad
  } = options;
  // 重写onload劫持setData
  // onLoad方法只有在页面实例化后才存在
  options.onLoad = (onLoadFunc => {
    return function (res) {
      const {
        setData
      } = this;
      Object.defineProperty(this.__proto__, "setData", {
        configurable: true,
        // 目标属性是否可以使用delete删除
        // 目标属性是否可以再次设置特性
        enumerator: false,
        value(...args) {
          if (global.state != "hide") {
            return setData.apply(this, args)
          } else {
            console.log("setData没有作用");
            return void(0);
          }
        }
      })
      onLoadFunc?.call(this, res)
    }
  })(onLoad);
  return nativePage?.call(this, options);
}