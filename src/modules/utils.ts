import { TypeJavascriptInterface } from './types';

/**
 * 화면 접근 OS 반환 함수
 * @returns {string}
 */
export function handleGetOsType(): string {
  const { userAgent } = navigator;

  if (/android/i.test(userAgent)) {
    return 'AND';
  }

  if (/iPad|iPhone|iPod/.test(userAgent)) {
    return 'IOS';
  }

  return 'BACK';
}

/**
 * Javascript Interface 호출 함수
 * @param {TypeJavascriptInterface} params action, bridge, data 들고 있는 객체
 * @returns
 */
export function handleJavascriptInterface({
  action,
  bridge = 'android', // FIXME: 나중에 정해지면 초기값 변경해야함
  data,
}: TypeJavascriptInterface) {
  return new Promise((resolve, reject) => {
    const interfaceNm = bridge as keyof Window;

    if (window[interfaceNm] && window[interfaceNm][action]) {
      if (data !== undefined)
        resolve(window[interfaceNm][action](JSON.stringify(data)));
      else resolve(window[interfaceNm][action]);
    } else {
      console.error(`앱 통신(${interfaceNm} ${action}) 에러`);
      reject();
    }
  });
}
