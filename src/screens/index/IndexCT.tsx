import React, { useEffect } from 'react';
import { CommonState } from 'middlewares/reduxToolkits/commonSlice';
import { CustomWindow } from 'modules/types';
import { useGetDatasHook } from 'modules/customHooks';
import IndexPT from './IndexPT';

function IndexCT({}: typeIndexCT): React.JSX.Element {
  const { datas, useGetDatas } = useGetDatasHook('http://localhost:3000/lwekj');

  useEffect(() => {
    const customWindow = window as CustomWindow;
    customWindow.goBack = handleGoBack;
    customWindow.onResult = handleOnResult;

    return () => {
      delete customWindow.goBack;
      delete customWindow.onResult;
    };
  }, []);

  const handleGoBack = (data?: any) => {
    console.warn('goBack visit? ', data);
  };

  const handleOnResult = (data?: any) => {
    console.warn('onResult visit?', data);
  };

  return <IndexPT />;
}

interface typeIndexCT extends CommonState {}

export default IndexCT;
