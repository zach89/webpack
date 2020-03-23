/**
 * 获取浏览器名称及版本号
 * @returns {{appname: string, version: number}} 返回浏览器名称和版本号信息
 */
function getBrowserInfo(userAgent) {
  var browser = { appname: 'unknown', version: '0' };
  console.log(userAgent);
  //IE,firefox,opera,chrome,netscape
  if (/(msie|firefox|opera|chrome|netscape)\D+(\d[\d.]*)/.test(userAgent)) {
    browser.appname = RegExp.$1;
    browser.version = RegExp.$2;
  } else if (/version\D+(\d[\d.]*).*safari/.test(userAgent)) {
    // safari
    browser.appname = 'safari';
    browser.version = RegExp.$2;
  }
  return browser;
}

/**
 *获取操作系统
 * @param userAgent
 * @returns {*}
 */
function getOS(userAgent) {
  userAgent = userAgent || navigator.userAgent;

  if (/(Windows NT 10.0|Windows 10)/i.test(userAgent)) {
    return 'windows 10';
  } else if (/(Windows NT 6.3|Windows 8.1)/i.test(userAgent)) {
    return 'windows 8.1';
  } else if (/(Windows NT 6.2|Windows 8)/i.test(userAgent)) {
    return 'windows 8';
  } else if (/(Windows NT 6.1|Windows 7)/i.test(userAgent)) {
    return 'windows 7';
  } else if (/Windows NT 6.0/i.test(userAgent)) {
    return 'windows vista';
  } else if (/Windows NT 5.2/i.test(userAgent)) {
    return 'windows 2003';
  } else if (/Windows NT 5.1/i.test(userAgent)) {
    return 'windows xp';
  } else if (/Windows NT 5.0/i.test(userAgent)) {
    return 'windows 2000';
  }

  if (/(iPhone|iPad|iPod|iOS)/i.test(userAgent)) {
    return 'ios';
  }

  if (/android/i.test(userAgent)) {
    return 'android';
  }

  if (/linux/i.test(userAgent)) {
    return 'linux';
  }

  if (/(macintosh|mac os x(.+)\)$)/i.test(userAgent)) {
    return 'mac os';
  }
  return '';
}

/**
 * 获取操作系统版本
 * @param userAgent
 * @returns {*}
 */
function getOSVersion(os, userAgent) {
  if (os === 'android') {
    if (/android\s+(\d+(.\d+)*)/i.test(userAgent)) {
      return RegExp.$1;
    }
  } else if (os === 'ios') {
    if (/cpu\s+(?:iphone\s+)?os\s+(\d+(_\d+)*)/i.test(userAgent)) {
      return RegExp.$1.replace(/_/g, '.');
    }
  }
  return '';
}

/**
 * 获取手机机型（仅限于android）
 * @param userAgent
 * @returns {*}
 */
function getModel(userAgent) {
  if (/android\s+\d+(?:.\d+)*;\s+(.+)\s+build/i.test(userAgent)) {
    return RegExp.$1;
  }
  return '';
}

function getDeviceInfo(userAgent: Navigator['userAgent']) {
  const ua = userAgent.toLowerCase();
  const browser = getBrowserInfo(ua);
  const os = getOS(ua);
  return {
    browser: browser.appname,
    browser_v: browser.version,
    os: os,
    os_v: getOSVersion(os, ua),
    model: getModel(ua),
  };
}
export { getDeviceInfo };
