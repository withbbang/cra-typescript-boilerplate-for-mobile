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
 * catch 절 처리 커스텀 훅 (팝업 발생)
 * @returns
 */
export function useSetCatchClauseForErrorPopupHook() {
  const dispatch = useDispatch();

  const useSetCatchClauseForErrorPopup = useCallback(
    (error: any, errorPopupBtnCb?: () => any) => {
      useSetMessage({ message: error.message });
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
 * datas 가져오기 커스텀 훅
 * @param {string} url api url
 * @param {Function | undefined} errorPopupBtnCb 에러팝업 버튼 콜백
 * @returns
 */
export function useGetDatasHook(url: string, errorPopupBtnCb?: () => any) {
  const dispatch = useDispatch();
  const useSetCatchClauseForErrorPopup = useSetCatchClauseForErrorPopupHook();
  const [datas, setDatas] = useState<any[]>([]); // FIXME: 수정 필요

  useEffect(() => {
    (async () => {
      try {
        dispatch(useSetIsLoading({ isLoading: true }));
        setDatas(await getAPI(url)); // FIXME: 수정 필요
      } catch (error: any) {
        useSetCatchClauseForErrorPopup(error, errorPopupBtnCb);
      } finally {
        dispatch(useSetIsLoading({ isLoading: false }));
      }
    })();
  }, [url, errorPopupBtnCb]);

  const useGetDatas = useCallback(
    async (url: string, errorPopupBtnCb?: () => any) => {
      try {
        dispatch(useSetIsLoading({ isLoading: true }));
        setDatas(await getAPI(url));
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
 * data 가져오기 커스텀 훅
 * @param {string} url api url
 * @param {Function | undefined} errorPopupBtnCb 에러팝업 버튼 콜백
 * @returns
 */
export function useGetDataHook(url: string, errorPopupBtnCb?: () => any) {
  const dispatch = useDispatch();
  const useSetCatchClauseForErrorPopup = useSetCatchClauseForErrorPopupHook();
  const [data, setData] = useState<any>(null); // FIXME: 수정 필요

  useEffect(() => {
    (async () => {
      try {
        dispatch(useSetIsLoading({ isLoading: true }));
        setData(await getAPI(url)); // FIXME: 수정 필요
      } catch (error: any) {
        useSetCatchClauseForErrorPopup(error, errorPopupBtnCb);
      } finally {
        dispatch(useSetIsLoading({ isLoading: false }));
      }
    })();
  }, [url, errorPopupBtnCb]);

  const useGetData = useCallback(
    async (url: string, errorPopupBtnCb?: () => any) => {
      try {
        dispatch(useSetIsLoading({ isLoading: true }));
        setData(await getAPI(url));
      } catch (error: any) {
        useSetCatchClauseForErrorPopup(error, errorPopupBtnCb);
      } finally {
        dispatch(useSetIsLoading({ isLoading: false }));
      }
    },
    [],
  );

  return { data, useGetData };
}

/**
 * datas post method 커스텀 훅
 * @param {string} url api url
 * @param {any} params body 데이터
 * @param {Function | undefined} errorPopupBtnCb 에러팝업 버튼 콜백
 * @returns
 */
export function usePostDatasHook(
  url: string,
  params: any,
  errorPopupBtnCb?: () => any,
) {
  const dispatch = useDispatch();
  const useSetCatchClauseForErrorPopup = useSetCatchClauseForErrorPopupHook();
  const [datas, setDatas] = useState<any[]>([]); // FIXME: 수정 필요

  useEffect(() => {
    (async () => {
      try {
        dispatch(useSetIsLoading({ isLoading: true }));
        setDatas(await postAPI(url, params)); // FIXME: 수정 필요
      } catch (error: any) {
        useSetCatchClauseForErrorPopup(error, errorPopupBtnCb);
      } finally {
        dispatch(useSetIsLoading({ isLoading: false }));
      }
    })();
  }, [url, errorPopupBtnCb]);

  const useGetDatas = useCallback(
    async (url: string, params: any, errorPopupBtnCb?: () => any) => {
      try {
        dispatch(useSetIsLoading({ isLoading: true }));
        setDatas(await postAPI(url, params));
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
 * data post method 커스텀 훅
 * @param {string} url api url
 * @param {any} params body 데이터
 * @param {Function | undefined} errorPopupBtnCb 에러팝업 버튼 콜백
 * @returns
 */
export function usePostDataHook(
  url: string,
  params: any,
  errorPopupBtnCb?: () => any,
) {
  const dispatch = useDispatch();
  const useSetCatchClauseForErrorPopup = useSetCatchClauseForErrorPopupHook();
  const [data, setData] = useState<any>(null); // FIXME: 수정 필요

  useEffect(() => {
    (async () => {
      try {
        dispatch(useSetIsLoading({ isLoading: true }));
        setData(await postAPI(url, params)); // FIXME: 수정 필요
      } catch (error: any) {
        useSetCatchClauseForErrorPopup(error, errorPopupBtnCb);
      } finally {
        dispatch(useSetIsLoading({ isLoading: false }));
      }
    })();
  }, [url, errorPopupBtnCb]);

  const useGetData = useCallback(
    async (url: string, params: any, errorPopupBtnCb?: () => any) => {
      try {
        dispatch(useSetIsLoading({ isLoading: true }));
        setData(await postAPI(url, params));
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
