import React from 'react';
import { Image } from 'antd';
import Icon from '../Icon';
import './index.less';

export interface PreviewProps {
  src: string;
  onRemove: () => void;
  onPreview: () => void;
}

const Preview: React.FC<PreviewProps> = ({ src, onRemove, onPreview }) => {
  const handleRemove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    onRemove && onRemove();
  };

  return (
    <div className="mm-upload-preview">
      <Image className="mm-upload-preview-image" src={src} preview={false} />
      <div className="mm-upload-preview-mask" onClick={onPreview}>
        <Icon
          className="mm-upload-preview-delete"
          type="icon-guanbi2"
          onClick={handleRemove}
        />
      </div>
    </div>
  );
};

export default Preview;
