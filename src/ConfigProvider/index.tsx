import React from 'react';
import { ConfigProvider } from 'antd';
import zh_CN from 'antd/lib/locale/zh_CN';
import en_US from 'antd/lib/locale/en_US';
import Cookies from 'js-cookie';

ConfigProvider.config({
  theme: {
    primaryColor: '#00A4F5',
  },
});

export default function ConfigProviderCom(props: any) {
  const languageType = Cookies.get('languageType');
  let local_locale = languageType;
  const userInfo = localStorage.getItem('userInfo');
  if (!local_locale && userInfo) {
    local_locale = JSON.parse(userInfo)?.languageType;
  }
  let locale = zh_CN;
  if (local_locale?.includes('en')) {
    locale = en_US;
  }


  return (
    <ConfigProvider locale={locale}>
      {props.children}
    </ConfigProvider>
  );
}
