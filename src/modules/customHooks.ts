import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  useSetErrorBtnCb,
  useSetConfirmBtnCb,
  useSetCancelBtnCb,
  useSetIsErrorPopupActive,
  useSetIsConfirmPopupActive,
  useSetIsLoading,
  useSetMessage,
} from 'middlewares/reduxToolkits/commonSlice';
import { getAPI, postAPI } from './apis';
import {
  TypeGetAPIHookParams,
  TypePostAPIByConfirmPopupHook,
  TypePostAPIHookParams,
} from './types';

/**
 * [catch 절 처리 커스텀 훅]
 *
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
 * [get method 커스텀 훅]
 *
 * @param {TypeGetAPIHookParams} params
 * url, API 성공시 바로 실행하는 콜백, API 실패시 바로 실행하는 콜백, 에러팝업 버튼 콜백을 담고 있는 객체
 *
 * @returns
 */
export function useGetDataHook({
  url,
  checkValidatioinCb,
  successCb,
  failCb,
  errorPopupBtnCb,
}: TypeGetAPIHookParams) {
  const dispatch = useDispatch();
  const useSetCatchClauseForErrorPopup = useSetCatchClauseForErrorPopupHook();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    (async () => {
      if (!url) return;

      try {
        checkValidatioinCb?.();
        dispatch(useSetIsLoading({ isLoading: true }));
        setData(await getAPI(url, failCb));
        successCb?.();
      } catch (error: any) {
        useSetCatchClauseForErrorPopup(error, errorPopupBtnCb);
      } finally {
        dispatch(useSetIsLoading({ isLoading: false }));
      }
    })();
  }, []);

  const useGetData = useCallback(
    async ({
      url,
      checkValidatioinCb,
      successCb,
      failCb,
      errorPopupBtnCb,
    }: TypeGetAPIHookParams) => {
      if (!url) return;

      try {
        dispatch(useSetIsLoading({ isLoading: true }));
        setData(await getAPI(url, failCb));
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
 * [post method 커스텀 훅]
 *
 * @param {TypeGetAPIHookParams} params
 * url, body 데이터, API 성공시 바로 실행하는 콜백,
 * API 실패시 바로 실행하는 콜백, 에러팝업 버튼 콜백을 담고 있는 객체
 *
 * @returns
 */
export function usePostDataHook({
  url,
  params,
  checkValidatioinCb,
  successCb,
  failCb,
  errorPopupBtnCb,
}: TypePostAPIHookParams) {
  const dispatch = useDispatch();
  const useSetCatchClauseForErrorPopup = useSetCatchClauseForErrorPopupHook();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    (async () => {
      if (!url) return;

      try {
        checkValidatioinCb?.();
        dispatch(useSetIsLoading({ isLoading: true }));
        setData(await postAPI(url, params, failCb));
        successCb?.();
      } catch (error: any) {
        useSetCatchClauseForErrorPopup(error, errorPopupBtnCb);
      } finally {
        dispatch(useSetIsLoading({ isLoading: false }));
      }
    })();
  }, []);

  const usePostData = useCallback(
    async ({
      url,
      params,
      successCb,
      failCb,
      errorPopupBtnCb,
    }: TypePostAPIHookParams) => {
      if (!url) return;

      try {
        checkValidatioinCb?.();
        dispatch(useSetIsLoading({ isLoading: true }));
        setData(await postAPI(url, params, failCb));
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

/**
 * [post method 확인 팝업 커스텀 훅]
 * @returns
 */
export function usePostDataByConfirmPopupHook() {
  const dispatch = useDispatch();
  const useSetCatchClauseForErrorPopup = useSetCatchClauseForErrorPopupHook();
  const [data, setData] = useState<any>();

  const useSetActivePostDataByConfirmPopup = useCallback(
    ({
      message,
      url,
      params,
      successCb,
      cancelBtnCb,
      failCb,
      errorPopupBtnCb,
    }: TypePostAPIByConfirmPopupHook) => {
      dispatch(useSetMessage({ message }));
      dispatch(useSetIsConfirmPopupActive({ isConfirmPopupActive: true }));
      dispatch(
        useSetConfirmBtnCb({
          callback: async () => {
            try {
              dispatch(useSetIsLoading({ isLoading: true }));
              setData(await postAPI(url, params, failCb));
              successCb?.();
            } catch (error: any) {
              useSetCatchClauseForErrorPopup(error, errorPopupBtnCb);
            } finally {
              dispatch(
                useSetIsConfirmPopupActive({ isConfirmPopupActive: false }),
              );
              dispatch(useSetIsLoading({ isLoading: false }));
            }
          },
        }),
      );
      dispatch(
        useSetCancelBtnCb({
          callback: () => {
            cancelBtnCb?.();
            dispatch(
              useSetIsConfirmPopupActive({ isConfirmPopupActive: false }),
            );
            dispatch(useSetMessage({ message: '' }));
          },
        }),
      );
    },
    [data],
  );

  return { data, useSetActivePostDataByConfirmPopup };
}
