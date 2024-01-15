import React from 'react';
import { PropState } from 'middlewares/configureReducer';
import { CommonState } from 'middlewares/reduxToolkits/commonSlice';
import { connect } from 'react-redux';
import { Action } from 'redux';
import styles from './ConfirmPopup.module.scss';

function mapStateToProps(state: PropState): CommonState {
  return {
    ...state.common,
  };
}

function mapDispatchToProps(dispatch: (actionFunction: Action<any>) => any) {
  return {};
}

function ConfirmPopup({
  message,
  isConfirmPopupActive,
  confirmBtnText,
  cancelBtnText,
  confirmBtnCb,
  cancelBtnCb,
}: CommonState): React.JSX.Element {
  return (
    <div
      className={styles.background}
      style={
        isConfirmPopupActive !== undefined && isConfirmPopupActive
          ? { display: '' }
          : { display: 'none' }
      }
    >
      <div className={styles.modalBody}>
        <span>{message}</span>
        <div>
          <button onClick={cancelBtnCb}>{cancelBtnText || '취소'}</button>
          <button onClick={confirmBtnCb}>{confirmBtnText || '확인'}</button>
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmPopup);
