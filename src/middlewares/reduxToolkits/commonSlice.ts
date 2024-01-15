import { createSlice } from '@reduxjs/toolkit';

export interface CommonState {
  message?: string; // 일반 팝업 메세지
  errorMessage?: string; // 에러 팝업 메세지
  isLoading?: boolean; // 로딩 여부
  isConfirmPopupActive?: boolean; // 확인 팝업 활성 여부
  confirmBtnText?: string; // 확인 팝업의 확인 버튼 텍스트
  cancelBtnText?: string; // 확인 팝업의 취소 버튼 텍스트
  isErrorPopupActive?: boolean; // 에러 팝업 활성 여부
  errorBtnText?: string; // 에러 팝업의 버튼 텍스트
  confirmBtnCb?: () => any; // 확인 팝업의 확인 버튼 콜백
  cancelBtnCb?: () => any; // 확인 팝업의 취소 버튼 콜백
  errorBtnCb?: () => any; // 에러 팝업의 버튼 콜백
}

export const initialState: CommonState = {
  message: '',
  errorMessage: '',
  isLoading: false,
  isConfirmPopupActive: false,
  confirmBtnText: '',
  cancelBtnText: '',
  isErrorPopupActive: false,
  errorBtnText: '',
  confirmBtnCb: () => {},
  cancelBtnCb: () => {},
  errorBtnCb: () => {},
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    // 일반 팝업 메세지 설정
    useSetMessage(state: CommonState, action) {
      state.message = action.payload.message;
    },
    // 에러 팝업 메세지 설정
    useSetErrorMessage(state: CommonState, action) {
      state.errorMessage = action.payload.errorMessage;
    },
    // 로딩 여부 설정
    useSetIsLoading(state: CommonState, action) {
      state.isLoading = action.payload.isLoading;
    },
    // 확인 팝업 활성 여부 설정
    useSetIsConfirmPopupActive(state: CommonState, action) {
      state.isConfirmPopupActive = action.payload.isConfirmPopupActive;
    },
    // 확인 팝업의 확인 버튼 텍스트 설정
    useSetIsErrorPopupActive(state: CommonState, action) {
      state.isErrorPopupActive = action.payload.isErrorPopupActive;
    },
    // 확인 팝업의 취소 버튼 텍스트 설정
    useSetConfirmBtnCb(state: CommonState, action) {
      state.confirmBtnCb = action.payload.confirmBtnCb;
    },
    // 에러 팝업 활성 여부 설정
    useSetCancelBtnCb(state: CommonState, action) {
      state.cancelBtnCb = action.payload.cancelBtnCb;
    },
    // 에러 팝업의 버튼 텍스트 설정
    useSetConfirmBtnText(state: CommonState, action) {
      state.confirmBtnText = action.payload.confirmBtnText;
    },
    // 확인 팝업의 확인 버튼 콜백 설정
    useSetCancelBtnText(state: CommonState, action) {
      state.cancelBtnText = action.payload.cancelBtnText;
    },
    // 확인 팝업의 취소 버튼 콜백 설정
    useSetErrorBtnCb(state: CommonState, action) {
      state.errorBtnCb = action.payload.errorBtnCb;
    },
    // 에러 팝업의 버튼 콜백 설정
    useSetErrorBtnText(state: CommonState, action) {
      state.errorBtnText = action.payload.errorBtnText;
    },
  },
  // API 리듀서들 비동기 상태값들 한번에 관리하기 위한 extraReducers 모음
  extraReducers: {
    // ...add others
  },
});

export const {
  useSetMessage,
  useSetErrorMessage,
  useSetIsLoading,
  useSetIsErrorPopupActive,
  useSetIsConfirmPopupActive,
  useSetConfirmBtnCb,
  useSetCancelBtnCb,
  useSetConfirmBtnText,
  useSetCancelBtnText,
  useSetErrorBtnCb,
  useSetErrorBtnText,
} = commonSlice.actions;

export default commonSlice.reducer;
