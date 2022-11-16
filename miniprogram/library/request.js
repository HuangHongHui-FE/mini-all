const BASE_URL = 'http://localhost:3000';

export default function request(args) {
  Object.assign(args, {
    enableCache: true,
    enableHttp2: true,
    enableQuic: true
  });

  if(args.url.indexOf("http://localhost:3000") > -1){
    args.url = args.url.replace("http://localhost:3000",BASE_URL)
  }else{
    args.url = `${BASE_URL}${args.url}`
  }

  return new Promise((resolve, reject) => {
    wx.request(Object.assign(args, {
      success: resolve,
      fail: reject
    }))
  })
}