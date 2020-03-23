import { getDeviceInfo } from './utils';
import historyInit from './historyInit';

function zio(appInfo: ioAppData) {
  this.app_id = appInfo.app_id;
  this.sdk = 'js';
  this.sdk_name = 'zio';
  this.sdk_v = '2.0.1';
}
function addEventHandler(element, type, handler) {
  if (element.addEventListener) {
    element.addEventListener(type, handler, true);
  } else if (element.attachEvent) {
    //兼容IE8-
    element.attachEvent('on' + type, handler);
  } else {
    element['on' + type] = handler;
  }
}
function time() {
  var t = performance.timing;
  var times: frontPerformance = {
    loadPage: t.loadEventEnd - t.navigationStart,
    domReady: t.domComplete - t.responseEnd,
    redirect: t.redirectEnd - t.redirectStart,
    lookupDomain: t.domainLookupEnd - t.domainLookupStart,
    ttfb: t.responseStart - t.navigationStart,
    request: t.responseEnd - t.requestStart,
    loadEvent: t.loadEventEnd - t.loadEventStart,
    appcache: t.domainLookupStart - t.fetchStart,
    unloadEvent: t.unloadEventEnd - t.unloadEventStart,
    tcpConnect: t.connectEnd - t.connectStart,
    whitePage: t.responseStart - t.navigationStart,
  };
  return times;
}
zio.prototype.init = function() {
  const deviceInfo = getDeviceInfo(navigator.userAgent);
  Object.keys(deviceInfo).forEach(k => {
    this[k] = deviceInfo[k];
  });
  this.initActions();
};
zio.prototype.addEvent = function(eventData) {
  // const result: ioEventData = {
  //   ...this,
  //   ...eventData,
  //   properties: {},
  //   type: 'event',
  //   time: new Date().valueOf(),
  // };
  // const nt = window.performance.timing;
  // const r = {};
  // for (const k in nt) {
  //   r[k] = nt[k] - t[k];
  // }
  const { t } = this;
  Promise.resolve().then(() => {
    console.log(new Date().valueOf() - t);
    this.t = new Date();
  });
};
zio.prototype.initActions = function() {
  const self = this;
  historyInit();
  self.t = new Date().valueOf();
  // window.addHistoryListener('history', function () {
  //   self.addEvent({ event_id: 'view_page_auto',t });
  // });
  addEventHandler(window, 'load', function() {
    self.addEvent({ event_id: 'view_page_auto' });
  });
  addEventHandler(window, 'hashchange', function() {
    self.addEvent({ event_id: 'view_page_auto' });
  });
};

const zioClient = new zio({ app_id: 'test_api_id' });
export default zioClient;
