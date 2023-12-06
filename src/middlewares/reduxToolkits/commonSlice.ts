import { createSlice } from '@reduxjs/toolkit';

export interface CommonState {
  message?: string;
  isLoading?: boolean;
  isConfirmPopupActive?: boolean;
  isErrorPopupActive?: boolean;
  useConfirmBtnCb?: () => void;
  useCancelBtnCb?: () => void;
  useErrorBtnCb?: () => void;
}

export const initialState: CommonState = {
  message: '',
  isLoading: false,
  isErrorPopupActive: false,
  isConfirmPopupActive: false,
  useConfirmBtnCb: () => {},
  useCancelBtnCb: () => {},
  useErrorBtnCb: () => {},
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
    useSetErrorBtnCb(state: CommonState, action) {
      state.useErrorBtnCb = action.payload.callback;
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
  useSetErrorBtnCb,
} = commonSlice.actions;

export default commonSlice.reducer;
