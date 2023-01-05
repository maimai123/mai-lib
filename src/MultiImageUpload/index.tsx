import React from 'react';
import { useSafeState } from 'ahooks';
import { Upload, UploadProps, message } from 'antd';
import classnames from 'classnames';
import { getLocale } from '@/utils';
import uploadPng from '@/assets/upload_img.png';

import './index.less';

export type ImageUploadProps = Omit<UploadProps, 'onChange'>;

const ImageUpload = (
  props: ImageUploadProps & {
    className?: string;
    style?: React.CSSProperties;
    // 文件大小，单位M
    size?: number;
    // 上传所需额外参数或返回上传额外参数的方法
    params?: { [x: string]: any };
    // 上传路径
    url: string;
    // 默认回填图片
    value: any[];
    // 回调函数
    onChange: (url: string[]) => void;
  },
) => {
  const {
    className,
    style,
    size,
    url = '/api/labbase/v1/secure/oss/uploadfile',
    value = [],
    onChange,
    ...rest
  } = props;
  const { maxCount = 2 } = rest;

  const [fileList, setFileList] = useSafeState<any[]>(
    value.map((item) => ({
      uid: '0',
      name: 'image.png',
      status: 'done',
      url: item,
    })),
  );

  const beforeUpload = (file: any) => {
    const isJpgOrPng = ['image/jpeg', 'image/png', 'image/jpg'].includes(
      file.type,
    );
    if (size && file.size / 1024 / 1024 > size) {
      message.warning(`${getLocale('common.uploadSize')}${size}M`);
      return false;
    }
    if (!isJpgOrPng) {
      message.warning(getLocale('common.format'));
      return false;
    }
    return true;
  };

  const handleChange = (info: { fileList: any }) => {
    try {
      let fileLists = [...info.fileList];
      fileLists = fileLists.slice(-maxCount);
      fileLists = fileLists.map((file) => {
        if (file?.response?.success) {
          file.url = file?.response?.data.downAddress || '';
        }
        return file;
      });
      setFileList(fileLists);
      onChange && onChange(fileLists.map((item: { url: any }) => item.url));
    } catch (err) {
      console.log(err);
      message.error(getLocale('common.imgFail'));
    }
  };

  const uploadButton = (
    <div>
      <img className="mm-upload-multi_default" src={uploadPng} alt="pic" />
      <div>{getLocale('common.upload')}</div>
    </div>
  );
  return (
    <>
      <Upload
        className={classnames('mm-upload-multi', className)}
        style={style}
        name="file"
        action={url}
        listType="picture-card"
        fileList={fileList}
        showUploadList={{
          showPreviewIcon: false,
          showDownloadIcon: true,
          showRemoveIcon: true,
        }}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        capture
        multiple
        accept=".png,.jpg,.jpeg"
        {...rest}
      >
        {fileList.length >= maxCount ? null : uploadButton}
      </Upload>
    </>
  );
};
export default ImageUpload;
