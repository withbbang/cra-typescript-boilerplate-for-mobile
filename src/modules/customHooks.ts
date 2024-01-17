import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  useSetErrorBtnCb,
  useSetConfirmBtnCb,
  useSetCancelBtnCb,
  useSetIsErrorPopupActive,
  useSetIsConfirmPopupActive,
  useSetIsLoading,
  useSetMessage,
  useSetErrorMessage,
  useSetConfirmBtnText,
  useSetCancelBtnText,
} from 'middlewares/reduxToolkits/commonSlice';
import { getAPI, postAPI } from './apis';
import {
  TypeGetAPIHookParams,
  TypeJavascriptInterface,
  TypeKeyValueForm,
  TypePostAPIByConfirmPopupHook,
  TypePostAPIHookParams,
} from './types';
import {
  handleParseDataFromJSInterface,
  handleSetParamsWithSync,
} from './utils';
import { NativeError } from './customErrorClasses';

/**
 * [input, textarea, select tag 커스텀 훅]
 *
 * @param {TypeKeyValueForm} keyValueForm key - value 객체
 * @returns
 */
export function useChangeHook(keyValueForm: TypeKeyValueForm) {
  const [form, setForm] = useState<TypeKeyValueForm>(keyValueForm);

  // input, textarea, select onChange 콜백 함수
  const useChange = useCallback(
    (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>
        | React.ChangeEvent<HTMLSelectElement>,
    ) => {
      const { name, value } = e.currentTarget;

      setForm((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [setForm],
  );

  return { form, setForm, useChange };
}

/**
 * [catch 절 처리 커스텀 훅]
 *
 * @returns
 */
export function useSetCatchClauseForErrorPopupHook() {
  const dispatch = useDispatch();

  const useSetCatchClauseForErrorPopup = useCallback(
    (error: any, errorPopupBtnCb?: () => any) => {
      if (error instanceof NativeError) throw new NativeError();

      dispatch(useSetErrorMessage({ errorMessage: error.message }));
      dispatch(useSetIsErrorPopupActive({ isErrorPopupActive: true }));
      dispatch(
        useSetErrorBtnCb({
          errorBtnCb: () => {
            dispatch(useSetIsErrorPopupActive({ isErrorPopupActive: false }));
            dispatch(useSetErrorMessage({ errorMessage: '' }));
            dispatch(useSetErrorBtnCb({}));
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
  beforeCb,
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
        beforeCb?.();
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

  const useGetData = useCallback(async () => {
    if (!url) return;

    try {
      beforeCb?.();
      dispatch(useSetIsLoading({ isLoading: true }));
      setData(await getAPI(url, failCb));
      successCb?.();
    } catch (error: any) {
      useSetCatchClauseForErrorPopup(error, errorPopupBtnCb);
    } finally {
      dispatch(useSetIsLoading({ isLoading: false }));
    }
  }, [data]);

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
  beforeCb,
  successCb,
  failCb,
  errorPopupBtnCb,
}: TypePostAPIHookParams) {
  const dispatch = useDispatch();
  const useSetCatchClauseForErrorPopup = useSetCatchClauseForErrorPopupHook();
  const [data, setData] = useState<any>(null);

  const usePostData = useCallback(
    async (params?: any) => {
      if (!url) return;

      try {
        beforeCb?.();
        dispatch(useSetIsLoading({ isLoading: true }));
        const response = await postAPI(
          url,
          await handleSetParamsWithSync(params),
          failCb,
        );
        setData(response);
        successCb?.(response);
      } catch (error: any) {
        useSetCatchClauseForErrorPopup(error, errorPopupBtnCb);
      } finally {
        dispatch(useSetIsLoading({ isLoading: false }));
      }
    },
    [url, beforeCb, successCb, failCb, errorPopupBtnCb, data],
  );

  return { data, usePostData };
}

/**
 * [post method 확인 팝업 커스텀 훅]
 * @returns
 */
export function usePostDataByConfirmPopupHook({
  message,
  url,
  confirmBtnText,
  cancelBtnText,
  beforeCb,
  successCb,
  cancelBtnCb,
  failCb,
  errorPopupBtnCb,
}: TypePostAPIByConfirmPopupHook) {
  const dispatch = useDispatch();
  const useSetCatchClauseForErrorPopup = useSetCatchClauseForErrorPopupHook();
  const [data, setData] = useState<any>();

  const useSetActivePostDataByConfirmPopup = useCallback(
    (params?: any) => {
      dispatch(useSetMessage({ message }));
      dispatch(useSetIsConfirmPopupActive({ isConfirmPopupActive: true }));
      dispatch(useSetConfirmBtnText({ confirmBtnText }));
      dispatch(useSetCancelBtnText({ cancelBtnText }));

      dispatch(
        useSetConfirmBtnCb({
          confirmBtnCb: async () => {
            try {
              beforeCb?.();
              dispatch(useSetIsLoading({ isLoading: true }));
              const response = await postAPI(
                url,
                await handleSetParamsWithSync(params),
                failCb,
              );
              setData(response);
              successCb?.(response);
              dispatch(
                useSetIsConfirmPopupActive({ isConfirmPopupActive: false }),
              );
              dispatch(useSetConfirmBtnText({ confirmBtnText: '' }));
              dispatch(useSetCancelBtnText({ cancelBtnText: '' }));
              dispatch(useSetConfirmBtnCb({}));
              dispatch(useSetCancelBtnCb({}));
            } catch (error: any) {
              useSetCatchClauseForErrorPopup(error, errorPopupBtnCb);
            } finally {
              dispatch(useSetIsLoading({ isLoading: false }));
            }
          },
        }),
      );

      dispatch(
        useSetCancelBtnCb({
          cancelBtnCb: () => {
            cancelBtnCb?.();
            dispatch(
              useSetIsConfirmPopupActive({ isConfirmPopupActive: false }),
            );
            dispatch(useSetMessage({ message: '' }));
            dispatch(useSetConfirmBtnText({ confirmBtnText: '' }));
            dispatch(useSetCancelBtnText({ cancelBtnText: '' }));
            dispatch(useSetConfirmBtnCb({}));
            dispatch(useSetCancelBtnCb({}));
          },
        }),
      );
    },
    [
      message,
      url,
      confirmBtnText,
      cancelBtnText,
      successCb,
      cancelBtnCb,
      failCb,
      errorPopupBtnCb,
      data,
    ],
  );

  return { data, useSetActivePostDataByConfirmPopup };
}

/**
 * [Javascript Interface 에러팝업 처리용 Hook]
 */
export function useJavascriptInterfaceHook() {
  const useSetCatchClauseForErrorPopup = useSetCatchClauseForErrorPopupHook();

  const useJavascriptInterface = useCallback(
    async ({
      bridge,
      action,
      data,
      hasCb,
      requiredPopup,
    }: TypeJavascriptInterface) => {
      try {
        return await handleParseDataFromJSInterface({
          bridge,
          action,
          data,
          hasCb,
          requiredPopup,
        });
      } catch (error: any) {
        return useSetCatchClauseForErrorPopup(error);
      }
    },
    [],
  );

  return useJavascriptInterface;
}
