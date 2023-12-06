import {
  TypeJavascriptInterface,
  TypeThrowCustomErrorInAPI,
  TypeThrowErrorInAPI,
} from './types';
import {
  BadGatewayError,
  BadRequestError,
  CustomAPIError,
  ForbiddenError,
  InternalServerErrorError,
  MethodNotAllowedError,
  NotFoundError,
  RequestTimeoutError,
  ServiceUnavailableError,
  UnauthorizedError,
} from './customErrorClasses';

/**
 * [API 상태 코드에 따른 에러 발생 함수]
 *
 * 상태코드, 에러 메세지, 에러팝업 콜백 함수 담고 있는 파라미터 객체
 * @param {TypeThrowErrorInAPI} parameters
 */
export function handleThrowErrorInAPI({
  status,
  message,
  failCb,
}: TypeThrowErrorInAPI) {
  failCb?.();
  switch (status) {
    case 400:
      throw new BadRequestError(message || 'Bad Request');
    case 401:
      throw new UnauthorizedError(message || 'Unauthorized');
    case 403:
      throw new ForbiddenError(message || 'Forbidden');
    case 404:
      throw new NotFoundError(message || 'Not Found');
    case 405:
      throw new MethodNotAllowedError(message || 'Method Not Allowed');
    case 408:
      throw new RequestTimeoutError(message || 'Request Timeout');
    case 500:
      throw new InternalServerErrorError(message || 'Internal Server');
    case 502:
      throw new BadGatewayError(message || 'Bad Gateway');
    case 503:
      throw new ServiceUnavailableError(message || 'Service Unavailable');
    default:
      break;
  }
}

/**
 * [Status Code는 정상이지만 서버 로직에 의한 에러 발생 함수]
 *
 * 코드, 에러 메세지, 에러팝업 콜백 함수 담고 있는 파라미터 객체
 * @param {TypeThrowErrorInAPI} parameters
 */
export function handleThrowCustomErrorInAPI({
  code,
  message,
  failCb,
}: TypeThrowCustomErrorInAPI) {
  failCb?.();
  // TODO: 코드에 따라 switch case 분기 필요
  throw new CustomAPIError(message);
}

/**
 * [화면 접근 OS 반환 함수]
 *
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
 * [Javascript Interface 호출 함수]
 *
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
