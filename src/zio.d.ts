interface ioAppData {
  // app相关
  app_id: string;
  app_v?: string;
  // 用户
  uid?: string;
  cookie_id?: string;
  platform?: string;
}
interface ioDeviceData {
  // 设备相关
  os: string;
  os_v: string;
  model: string;
  device_id: string;
  browser: string;
  browser_v: string;
  latitude?: string;
  longitude?: string;
  //页面相关
  s_h?: number;
  s_w?: number;
}
interface ioBaseData extends ioAppData, ioDeviceData {
  //sdk相关
  sdk?: string;
  sdk_name?: string;
  sdk_v?: string;
}

interface ioBatchProperties {
  event_id: string;
  page_url: string;
  page_name: string;
  page_ref: string;
  properties: object; // 自定义数据
  time: Date;
}

interface ioEventData extends ioBaseData, ioBatchProperties {
  type: string; // event
}
interface ioBatchData extends ioBaseData {
  event_id: string;
  type: string; //batch
  properties: Array<ioBatchProperties>; // 自定义数据
  time: Date;
}
interface frontPerformance {
  // 页面加载时间
  loadPage: number; // t.loadEventEnd - t.navigationStart;
  // 白屏时间
  whitePage: number; // t.responseStart - t.navigationStart;

  //【重要】解析 DOM 树结构的时间
  //【原因】反省下你的 DOM 树嵌套是不是太多了！
  domReady: number; // t.domComplete - t.responseEnd;

  //【重要】重定向的时间
  //【原因】拒绝重定向！比如，http://example.com/ 就不该写成 http://example.com
  redirect: number; // t.redirectEnd - t.redirectStart;

  //【重要】DNS 查询时间
  //【原因】DNS 预加载做了么？页面内是不是使用了太多不同的域名导致域名查询的时间太长？
  // 可使用 HTML5 Prefetch 预查询 DNS ，见：[HTML5 prefetch](http://segmentfault.com/a/1190000000633364)
  lookupDomain: number; // t.domainLookupEnd - t.domainLookupStart;

  //【重要】读取页面第一个字节的时间
  //【原因】这可以理解为用户拿到你的资源占用的时间，加异地机房了么，加CDN 处理了么？加带宽了么？加 CPU 运算速度了么？
  // TTFB 即 Time To First Byte 的意思
  // 维基百科：https://en.wikipedia.org/wiki/Time_To_First_Byte
  ttfb: number; // t.responseStart - t.navigationStart;

  //【重要】内容加载完成的时间
  //【原因】页面内容经过 gzip 压缩了么，静态资源 css/js 等压缩了么？
  request: number; // t.responseEnd - t.requestStart;

  //【重要】执行 onload 回调函数的时间
  //【原因】是否太多不必要的操作都放到 onload 回调函数里执行了，考虑过延迟加载、按需加载的策略么？
  loadEvent: number; // t.loadEventEnd - t.loadEventStart;

  // DNS 缓存时间
  appcache: number; // t.domainLookupStart - t.fetchStart;

  // 卸载页面的时间
  unloadEvent: number; // t.unloadEventEnd - t.unloadEventStart;

  // TCP 建立连接完成握手的时间
  tcpConnect: number; // t.connectEnd - t.connectStart;
}
interface Window {
  addHistoryListener: Function;
}
