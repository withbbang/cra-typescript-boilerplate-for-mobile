import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  useSetErrorBtnCb,
  useSetIsErrorPopupActive,
  useSetIsLoading,
  useSetMessage,
} from 'middlewares/reduxToolkits/commonSlice';
import { getAPI, postAPI } from './apis';

/**
 * catch 절 처리 커스텀 훅
 * @returns
 */
export function useSetCatchClauseForErrorPopupHook() {
  const dispatch = useDispatch();

  const useSetCatchClauseForErrorPopup = useCallback(
    (error: any, errorPopupBtnCb?: () => any) => {
      dispatch(useSetMessage({ message: error.message }));
      dispatch(useSetIsErrorPopupActive({ isErrorPopupActive: true }));
      dispatch(
        useSetErrorBtnCb({
          callback: () => {
            dispatch(useSetIsErrorPopupActive({ isErrorPopupActive: false }));
            dispatch(useSetMessage({ message: '' }));
            errorPopupBtnCb?.();
          },
        }),
      );
    },
    [],
  );

  return useSetCatchClauseForErrorPopup;
}

/**
 * get method 커스텀 훅
 * @param {string} url api url
 * @param {Function | undefined} successCb API 성공시 바로 실행하는 콜백
 * @param {Function | undefined} failCb API 실패시 바로 실행하는 콜백
 * @param {Function | undefined} errorPopupBtnCb 에러팝업 버튼 콜백
 * @returns
 */
export function useGetDatasHook(
  url: string | '',
  successCb?: () => any,
  failCb?: () => any,
  errorPopupBtnCb?: () => any,
) {
  const dispatch = useDispatch();
  const useSetCatchClauseForErrorPopup = useSetCatchClauseForErrorPopupHook();
  const [datas, setDatas] = useState<any[]>([]); // FIXME: 수정 필요

  useEffect(() => {
    (async () => {
      if (!url) return;

      try {
        dispatch(useSetIsLoading({ isLoading: true }));
        setDatas(await getAPI(url, failCb)); // FIXME: 수정 필요
        successCb?.();
      } catch (error: any) {
        useSetCatchClauseForErrorPopup(error, errorPopupBtnCb);
      } finally {
        dispatch(useSetIsLoading({ isLoading: false }));
      }
    })();
  }, [url]);

  const useGetDatas = useCallback(
    async (
      url: string,
      successCb?: () => any,
      failCb?: () => any,
      errorPopupBtnCb?: () => any,
    ) => {
      try {
        dispatch(useSetIsLoading({ isLoading: true }));
        setDatas(await getAPI(url, failCb)); // FIXME: 수정 필요
        successCb?.();
      } catch (error: any) {
        useSetCatchClauseForErrorPopup(error, errorPopupBtnCb);
      } finally {
        dispatch(useSetIsLoading({ isLoading: false }));
      }
    },
    [datas],
  );

  return { datas, useGetDatas };
}

/**
 * get method 커스텀 훅
 * @param {string} url api url
 * @param {Function | undefined} successCb API 성공시 바로 실행하는 콜백
 * @param {Function | undefined} failCb API 실패시 바로 실행하는 콜백
 * @param {Function | undefined} errorPopupBtnCb 에러팝업 버튼 콜백
 * @returns
 */
export function useGetDataHook(
  url: string | '',
  successCb?: () => any,
  failCb?: () => any,
  errorPopupBtnCb?: () => any,
) {
  const dispatch = useDispatch();
  const useSetCatchClauseForErrorPopup = useSetCatchClauseForErrorPopupHook();
  const [data, setData] = useState<any>(null); // FIXME: 수정 필요

  useEffect(() => {
    (async () => {
      if (!url) return;

      try {
        dispatch(useSetIsLoading({ isLoading: true }));
        setData(await getAPI(url, failCb)); // FIXME: 수정 필요
        successCb?.();
      } catch (error: any) {
        useSetCatchClauseForErrorPopup(error, errorPopupBtnCb);
      } finally {
        dispatch(useSetIsLoading({ isLoading: false }));
      }
    })();
  }, [url]);

  const useGetData = useCallback(
    async (
      url: string,
      successCb?: () => any,
      failCb?: () => any,
      errorPopupBtnCb?: () => any,
    ) => {
      try {
        dispatch(useSetIsLoading({ isLoading: true }));
        setData(await getAPI(url, failCb)); // FIXME: 수정 필요
        successCb?.();
      } catch (error: any) {
        useSetCatchClauseForErrorPopup(error, errorPopupBtnCb);
      } finally {
        dispatch(useSetIsLoading({ isLoading: false }));
      }
    },
    [data],
  );

  return { data, useGetData };
}

/**
 * post method 커스텀 훅
 * @param {string} url api url
 * @param {any} params body 데이터
 * @param {Function | undefined} successCb API 성공시 바로 실행하는 콜백
 * @param {Function | undefined} failCb API 실패시 바로 실행하는 콜백
 * @param {Function | undefined} errorPopupBtnCb 에러팝업 버튼 콜백
 * @returns
 */
export function usePostDatasHook(
  url: string | '',
  params: any,
  successCb?: () => any,
  failCb?: () => any,
  errorPopupBtnCb?: () => any,
) {
  const dispatch = useDispatch();
  const useSetCatchClauseForErrorPopup = useSetCatchClauseForErrorPopupHook();
  const [datas, setDatas] = useState<any[]>([]); // FIXME: 수정 필요

  useEffect(() => {
    (async () => {
      if (!url) return;

      try {
        dispatch(useSetIsLoading({ isLoading: true }));
        setDatas(await postAPI(url, params, failCb)); // FIXME: 수정 필요
        successCb?.();
      } catch (error: any) {
        useSetCatchClauseForErrorPopup(error, errorPopupBtnCb);
      } finally {
        dispatch(useSetIsLoading({ isLoading: false }));
      }
    })();
  }, [url]);

  const usePostDatas = useCallback(
    async (
      url: string,
      params: any,
      successCb?: () => any,
      failCb?: () => any,
      errorPopupBtnCb?: () => any,
    ) => {
      try {
        dispatch(useSetIsLoading({ isLoading: true }));
        setDatas(await postAPI(url, params, failCb)); // FIXME: 수정 필요
        successCb?.();
      } catch (error: any) {
        useSetCatchClauseForErrorPopup(error, errorPopupBtnCb);
      } finally {
        dispatch(useSetIsLoading({ isLoading: false }));
      }
    },
    [datas],
  );

  return { datas, usePostDatas };
}

/**
 * post method 커스텀 훅
 * @param {string} url api url
 * @param {any} params body 데이터
 * @param {Function | undefined} successCb API 성공시 바로 실행하는 콜백
 * @param {Function | undefined} failCb API 실패시 바로 실행하는 콜백
 * @param {Function | undefined} errorPopupBtnCb 에러팝업 버튼 콜백
 * @returns
 */
export function usePostDataHook(
  url: string | '',
  params: any,
  successCb?: () => any,
  failCb?: () => any,
  errorPopupBtnCb?: () => any,
) {
  const dispatch = useDispatch();
  const useSetCatchClauseForErrorPopup = useSetCatchClauseForErrorPopupHook();
  const [data, setData] = useState<any>(null); // FIXME: 수정 필요

  useEffect(() => {
    (async () => {
      if (!url) return;

      try {
        dispatch(useSetIsLoading({ isLoading: true }));
        setData(await postAPI(url, params, failCb)); // FIXME: 수정 필요
        successCb?.();
      } catch (error: any) {
        useSetCatchClauseForErrorPopup(error, errorPopupBtnCb);
      } finally {
        dispatch(useSetIsLoading({ isLoading: false }));
      }
    })();
  }, [url]);

  const usePostData = useCallback(
    async (
      url: string,
      params: any,
      successCb?: () => any,
      failCb?: () => any,
      errorPopupBtnCb?: () => any,
    ) => {
      try {
        dispatch(useSetIsLoading({ isLoading: true }));
        setData(await postAPI(url, params, failCb)); // FIXME: 수정 필요
        successCb?.();
      } catch (error: any) {
        useSetCatchClauseForErrorPopup(error, errorPopupBtnCb);
      } finally {
        dispatch(useSetIsLoading({ isLoading: false }));
      }
    },
    [data],
  );

  return { data, usePostData };
}
