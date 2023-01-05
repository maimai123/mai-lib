import React from 'react';
import { useSafeState } from 'ahooks';
import { Upload, UploadProps, message, Spin } from 'antd';
import Icon from '../Icon';
import { getLocale } from '@/utils';
import classnames from 'classnames';
import uploadPng from '@/assets/upload_img.png';
import './index.less';

export interface ImageUploadProps extends UploadProps {
  className?: string;
  style?: React.CSSProperties;
  // 文件大小，单位M
  size?: number;
  // 上传所需额外参数或返回上传额外参数的方法
  params?: { [x: string]: any };
  // 上传路径
  url: string;
  // 默认回填图片
  value?: string;
  // 回调函数
  onChange: (url: any) => void;
}

const ImageUpload = (props: ImageUploadProps) => {
  const {
    className,
    style,
    size = 2,
    url = '/api/labbase/v1/secure/oss/uploadfile',
    value = '',
    onChange,
    ...rest
  } = props;

  const [link, setLink] = useSafeState<string>(value);
  const [loading, setLoading] = useSafeState(false);
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

  const handleChange = (info: { file: { status?: any; response?: any } }) => {
    try {
      if (info.file.status === 'uploading') {
        setLoading(true);
      }
      if (info.file.status === 'done') {
        const { response } = info.file;
        if (response.success) {
          setLink(response?.data?.downAddress);
          onChange && onChange(response?.data?.downAddress);
        } else {
          message.error(response.message);
        }
        setLoading(false);
      }
      if (info.file.status === 'error') {
        message.error(getLocale('common.imgFail'));
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <>
      <div className="mm-upload-container">
        <Upload
          name="file"
          capture
          action={url}
          className={classnames('mm-upload', className, 'mm-upload-preview')}
          style={style}
          beforeUpload={beforeUpload}
          onChange={handleChange}
          showUploadList={false}
          accept=".png,.jpg,.jpeg"
          {...rest}
        >
          <Spin spinning={loading}>
            <div className="mm-upload_btn">
              {link ? (
                <>
                  <img className="mm-upload_show" src={link} alt="pic" />
                  <Icon
                    className="mm-upload_del"
                    type="icon-guanbi2"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLink('');
                      onChange && onChange('');
                    }}
                  />
                </>
              ) : (
                <>
                  <img
                    className="mm-upload_default"
                    src={uploadPng}
                    alt="pic"
                  />
                  <div>{getLocale('common.upload')}</div>
                </>
              )}
            </div>
          </Spin>
        </Upload>
      </div>
    </>
  );
};
export default ImageUpload;
