import { createSlice } from '@reduxjs/toolkit';

export interface CommonState {
  message?: string;
  isLoading?: boolean;
  isConfirmPopupActive?: boolean;
  confirmBtnText?: string;
  cancelBtnText?: string;
  isErrorPopupActive?: boolean;
  errorBtnText?: string;
  useConfirmBtnCb?: () => any;
  useCancelBtnCb?: () => any;
  useConfirmBtnText?: (text: string) => any;
  useCancelBtnText?: (text: string) => any;
  useErrorBtnCb?: () => any;
  useErrorBtnText?: (text: string) => any;
}

export const initialState: CommonState = {
  message: '',
  isLoading: false,
  isConfirmPopupActive: false,
  confirmBtnText: '',
  cancelBtnText: '',
  isErrorPopupActive: false,
  errorBtnText: '',
  useConfirmBtnCb: () => {},
  useCancelBtnCb: () => {},
  useConfirmBtnText: () => {},
  useCancelBtnText: () => {},
  useErrorBtnCb: () => {},
  useErrorBtnText: () => {},
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    useSetMessage(state: CommonState, action) {
      state.message = action.payload.message;
    },
    useSetIsLoading(state: CommonState, action) {
      state.isLoading = action.payload.isLoading;
    },
    useSetIsConfirmPopupActive(state: CommonState, action) {
      state.isConfirmPopupActive = action.payload.isConfirmPopupActive;
    },
    useSetIsErrorPopupActive(state: CommonState, action) {
      state.isErrorPopupActive = action.payload.isErrorPopupActive;
    },
    useSetConfirmBtnCb(state: CommonState, action) {
      state.useConfirmBtnCb = action.payload.callback;
    },
    useSetCancelBtnCb(state: CommonState, action) {
      state.useCancelBtnCb = action.payload.callback;
    },
    useSetConfirmBtnText(state: CommonState, action) {
      state.confirmBtnText = action.payload.text;
    },
    useSetCancelBtnText(state: CommonState, action) {
      state.cancelBtnText = action.payload.text;
    },
    useSetErrorBtnCb(state: CommonState, action) {
      state.useErrorBtnCb = action.payload.callback;
    },
    useSetErrorBtnText(state: CommonState, action) {
      state.errorBtnText = action.payload.text;
    },
  },
  // API 리듀서들 비동기 상태값들 한번에 관리하기 위한 extraReducers 모음
  extraReducers: {
    // ...add others
  },
});

export const {
  useSetMessage,
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
