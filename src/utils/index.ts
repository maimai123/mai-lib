import Cookies from 'js-cookie';
import locales from './locales/index';
/**
 * 删除对象中所有的空值
 * @param obj
 */
export const removeObjectNull = (obj: { [key: string]: any }) => {
  const newObj: { [key: string]: any } = {};
  Object.keys(obj || {}).forEach((key) => {
    if (obj[key] || obj[key] === 0) {
      newObj[key] = obj[key];
    }
  });
  return newObj;
};
/**
 * 文件流导出
 * @param obj
 * @param fileName
 */
export const exportBlob = (blob: any, fileName?: any) => {
  const flag = (window as any).navigator.msSaveOrOpenBlob;
  if (flag) {
    (navigator as any).msSaveBlob(blob, fileName);
  } else {
    const link = document.createElement('a');
    const body = document.querySelector('body');

    link.href = URL.createObjectURL(blob);
    link.download = fileName;

    // fix Firefox
    link.style.display = 'none';
    if (body) {
      body.appendChild(link);
      link.click();
      body.removeChild(link);
    }

    window.URL.revokeObjectURL(link.href);
  }
};

/**
 * 国际化
 * @param key
 */
export const getLocale = (key: any) => {
  const languageType = Cookies.get('languageType');
  let local_locale = languageType;
  const userInfo = localStorage.getItem('userInfo');
  if (!local_locale && userInfo) {
    local_locale = JSON.parse(userInfo)?.languageType;
  }
  let lang = 'zh';
  if (local_locale?.includes('en')) {
    lang = 'en';
  }

  // @ts-ignore
  return locales[lang][key];
};
