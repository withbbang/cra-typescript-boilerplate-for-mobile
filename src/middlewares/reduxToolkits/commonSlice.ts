import { createSlice } from '@reduxjs/toolkit';

export interface CommonState {
  isLoading?: boolean;
  message?: string;
  errorMessage?: string;
  infoMessage?: string;
  isConfirmPopupActive?: boolean;
  isErrorPopupActive?: boolean;
  isInfoPopupActive?: boolean;
  confirmBtnText?: string;
  cancelBtnText?: string;
  errorBtnText?: string;
  infoBtnText?: string;
  useConfirmBtnCb?: () => void;
  useCancelBtnCb?: () => void;
  useErrorBtnCb?: () => void;
  useInfoBtnCb?: () => void;
}

export const initialState: CommonState = {
  isLoading: false,
  message: '',
  errorMessage: '',
  infoMessage: '',
  isConfirmPopupActive: false,
  isErrorPopupActive: false,
  isInfoPopupActive: false,
  confirmBtnText: '',
  cancelBtnText: '',
  errorBtnText: '',
  infoBtnText: '',
  useConfirmBtnCb: () => {},
  useCancelBtnCb: () => {},
  useErrorBtnCb: () => {},
  useInfoBtnCb: () => {},
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    useSetIsLoading(state: CommonState, action) {
      state.isLoading = action.payload.isLoading;
    },
    useSetMessage(state: CommonState, action) {
      state.message = action.payload.message;
    },
    useSetErrorMessage(state: CommonState, action) {
      state.errorMessage = action.payload.errorMessage;
    },
    useSetInfoMessage(state: CommonState, action) {
      state.infoMessage = action.payload.infoMessage;
    },
    useSetIsConfirmPopupActive(state: CommonState, action) {
      state.isConfirmPopupActive = action.payload.isConfirmPopupActive;
    },
    useSetIsErrorPopupActive(state: CommonState, action) {
      state.isErrorPopupActive = action.payload.isErrorPopupActive;
    },
    useSetIsInfoPopupActive(state: CommonState, action) {
      state.isInfoPopupActive = action.payload.isInfoPopupActive;
    },
    useSetConfirmBtnText(state: CommonState, action) {
      state.confirmBtnText = action.payload.confirmBtnText;
    },
    useSetCancelBtnText(state: CommonState, action) {
      state.cancelBtnText = action.payload.cancelBtnText;
    },
    useSetErrorBtnText(state: CommonState, action) {
      state.errorBtnText = action.payload.errorBtnText;
    },
    useSetInfoBtnText(state: CommonState, action) {
      state.infoBtnText = action.payload.infoBtnText;
    },
    useSetConfirmBtnCb(state: CommonState, action) {
      state.useConfirmBtnCb = action.payload.useConfirmBtnCb;
    },
    useSetCancelBtnCb(state: CommonState, action) {
      state.useCancelBtnCb = action.payload.useCancelBtnCb;
    },
    useSetErrorBtnCb(state: CommonState, action) {
      state.useErrorBtnCb = action.payload.useErrorBtnCb;
    },
    useSetInfoBtnCb(state: CommonState, action) {
      state.useInfoBtnCb = action.payload.useInfoBtnCb;
    },
  },
  // API 리듀서들 비동기 상태값들 한번에 관리하기 위한 extraReducers 모음
  extraReducers: {
    // ...add others
  },
});

export const {
  useSetIsLoading,
  useSetMessage,
  useSetErrorMessage,
  useSetInfoMessage,
  useSetIsConfirmPopupActive,
  useSetIsErrorPopupActive,
  useSetIsInfoPopupActive,
  useSetConfirmBtnText,
  useSetCancelBtnText,
  useSetErrorBtnText,
  useSetInfoBtnText,
  useSetConfirmBtnCb,
  useSetCancelBtnCb,
  useSetErrorBtnCb,
  useSetInfoBtnCb,
} = commonSlice.actions;

export default commonSlice.reducer;
