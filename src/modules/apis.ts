import { handleThrowCustomErrorInAPI, handleThrowErrorInAPI } from './utils';

/**
 * GET API
 * @param {string} url 요청 URL
 * @param {Function | undefined} failCb API 실패시 바로 실행하는 콜백
 * @returns {Promise<any>}
 */
function getAPI(url: string, failCb?: () => any): Promise<any> {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'GET',
      //   mode: "no-cors",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status < 400) {
          return response.json();
        }

        return handleThrowErrorInAPI({ status: response.status, failCb });
      })
      .then((result) => {
        console.debug('result: ', result);
        const {
          result: { code, message },
          data,
        } = result;

        if (code !== '000000')
          handleThrowCustomErrorInAPI({ code, message, failCb });

        resolve(data);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
}

/**
 * POST API
 * @param {string} url 요청 URL
 * @param {any} payload 요청 DATA
 * @param {Function | undefined} failCb API 실패시 바로 실행하는 콜백
 * @returns {Promise<any>}
 */
function postAPI(url: string, payload: any, failCb?: () => any): Promise<any> {
  console.debug('parameters: ', payload);
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'POST',
      //   mode: "no-cors",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (response.status < 400) {
          return response.json();
        }

        return handleThrowErrorInAPI({ status: response.status, failCb });
      })
      .then((result) => {
        console.debug('result: ', result);
        const {
          result: { code, message },
          data,
        } = result;

        if (code !== '000000')
          handleThrowCustomErrorInAPI({ code, message, failCb });

        resolve(data);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
}

/**
 * PUT API
 * @param {string} url 요청 URL
 * @param {any} payload 요청 DATA
 * @param {Function | undefined} failCb API 실패시 바로 실행하는 콜백
 * @returns {Promise<any>}
 */
function putAPI(url: string, payload: any, failCb?: () => any): Promise<any> {
  console.debug('parameters: ', payload);
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'PUT',
      //   mode: "no-cors",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (response.status < 400) {
          return response.json();
        }

        return handleThrowErrorInAPI({ status: response.status, failCb });
      })
      .then((result) => {
        console.debug('result: ', result);
        const {
          result: { code, message },
          data,
        } = result;

        if (code !== '000000')
          handleThrowCustomErrorInAPI({ code, message, failCb });

        resolve(data);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
}

/**
 * DELETE API
 * @param {string} url 요청 URL
 * @param {any} payload 요청 DATA
 * @param {Function | undefined} failCb API 실패시 바로 실행하는 콜백
 * @returns {Promise<any>}
 */
function deleteAPI(
  url: string,
  payload: any,
  failCb?: () => any,
): Promise<any> {
  console.debug('parameters: ', payload);
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'DELETE',
      //   mode: "no-cors",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (response.status < 400) {
          return response.json();
        }

        return handleThrowErrorInAPI({ status: response.status, failCb });
      })
      .then((result) => {
        console.debug('result: ', result);
        const {
          result: { code, message },
          data,
        } = result;

        if (code !== '000000')
          handleThrowCustomErrorInAPI({ code, message, failCb });

        resolve(data);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
}

export { getAPI, postAPI, putAPI, deleteAPI };
