import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  useSetErrorBtnCb,
  useSetIsErrorPopupActive,
  useSetIsLoading,
  useSetMessage,
} from 'middlewares/reduxToolkits/commonSlice';
import { getAPI } from './apis';

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
export function useGetDatas(url: string, errorPopupBtnCb?: () => any) {
  const dispatch = useDispatch();
  const useSetCatchClauseForErrorPopup = useSetCatchClauseForErrorPopupHook();
  const [datas, setDatas] = useState<any[]>([]);

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

  return datas;
}

/**
 * data 가져오기 커스텀 훅
 * @param {string} url api url
 * @param {string} id data id
 * @param {Function | undefined} errorPopupBtnCb 에러팝업 버튼 콜백
 * @returns
 */
export function useGetData(
  url: string,
  id: string,
  errorPopupBtnCb?: () => void,
) {
  const dispatch = useDispatch();
  const useSetCatchClauseForErrorPopup = useSetCatchClauseForErrorPopupHook();
  const [data, setData] = useState<any>(null);

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
  }, [url, id, errorPopupBtnCb]);

  return data;
}
