import { getDeviceInfo } from '../lib/utils';

describe('工具类测试', () => {
  test('获取设备信息测试', () => {
    const userAgent =
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36';
    const result = getDeviceInfo(userAgent);
    expect(result.browser).toBe('chrome');
    expect(result.browser_v).toBe('80.0.3987.122');
    expect(result.os).toBe('mac os');
    expect(result.os_v).toBe('');
    expect(result.model).toBe('');
  });
});
