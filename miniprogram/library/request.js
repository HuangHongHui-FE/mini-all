const BASE_URL = 'http://localhost:3000';

const PriorityAsyncQueue = require("priority-async-queue");
const queue = new PriorityAsyncQueue(10); // default 10

// 支持的优先级
const low = "low",
  normal = "normal",
  mid = "mid",
  high = "high",
  urgent = "urgent";

export const priority = {
  low,
  normal,
  mid,
  high,
  urgent
};
export default function request(args) {
  Object.assign(args, {
    enableCache: true,
    enableHttp2: true,
    enableQuic: true
  });

  if (args.url.indexOf("http://localhost:3000") > -1) {
    args.url = args.url.replace("http://localhost:3000", BASE_URL)
  } else {
    args.url = `${BASE_URL}${args.url}`
  }

  const priority = args.priority ? args.priority : normal;

  return new Promise((resolve, reject) => {
    queue.addTask({
      priority
    }, () => {
      wx.request(Object.assign(args, {
        success: resolve,
        fail: reject
      }))
    })
  })
}