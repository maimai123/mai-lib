import React from 'react';
import { Modal, ModalFuncProps } from 'antd';
import Icon from '@/Icon';
import classnames from 'classnames';
import { getLocale } from '@/utils';
import './index.less';

interface IProps extends ModalFuncProps {
  className?: string;
  style?: React.CSSProperties;
}

const Index = (props: IProps) => {
  const {
    className,
    style,
    okText = getLocale('common.okBtn'),
    cancelText = getLocale('common.cancel'),
    ...rest
  } = props;

  return Modal.confirm({
    className: classnames('iLab-modal-confirm', className),
    icon: null,
    closable: true,
    okText,
    cancelText,
    closeIcon: <Icon
      className="iLab-modal-confirm-close"
      type="icon-biaoge-quxiao"
    />,
    ...rest,
  });
};
export default Index;
