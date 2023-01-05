import React, { memo, useEffect } from 'react';
import { useSafeState } from 'ahooks';
import { Modal, Button, Space, ModalProps } from 'antd';
import Icon from '@/Icon';
import ConfigProviderCom from '@/ConfigProvider';
import classnames from 'classnames';
import './index.less';

export interface ActionType {
  open: (val: any) => void;
  close: () => void;
}
interface IProps extends ModalProps {
  className?: string;
  style?: React.CSSProperties;
  render: React.ReactNode;
  children: React.ReactNode;
  callback?: () => void;
  actionRef?:
    | React.MutableRefObject<ActionType | undefined>
    | ((actionRef: ActionType) => void);
}

const Index: React.FC<IProps> = (props: IProps) => {
  const {
    className,
    style,
    children,
    render,
    okText,
    cancelText,
    callback,
    onOk,
    onCancel,
    actionRef,
    ...rest
  } = props;
  const [visible, setVisible] = useSafeState<boolean>(false);
  const [loading, setLoading] = useSafeState<boolean>(false);

  useEffect(() => {
    if (visible) {
      callback && callback();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  useEffect(() => {
    const userAction: ActionType = {
      open: async (cb: any) => {
        await setVisible(true);
        setTimeout(() => {
          cb && cb();
        }, 1);
      },
      close: async () => {
        setVisible(false);
        setLoading(false);
      },
    };

    if (actionRef && typeof actionRef !== 'function') {
      actionRef.current = userAction;
    }
  }, []);

  const handleSubmit = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setLoading(true);
    try {
      onOk && (await onOk(e));
      setVisible(false);
      setLoading(false);
    } catch (err) {
      setVisible(true);
      setLoading(false);
    }
  };

  const handleReset = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    onCancel && (await onCancel(e));
    setVisible(false);
  };

  return (
    <ConfigProviderCom>
      <Modal
        className={classnames('mm-modal', className)}
        style={style}
        destroyOnClose
        closeIcon={
          <Icon
            className="mm-modal-close"
            type="icon-biaoge-quxiao"
            onClick={() => setVisible(false)}
          />
        }
        onCancel={() => setVisible(false)}
        visible={visible}
        footer={
          <Space className="mm-modal-footer">
            {cancelText && <Button onClick={handleReset}>{cancelText}</Button>}
            {okText && (
              <Button type="primary" onClick={handleSubmit} loading={loading}>
                {okText}
              </Button>
            )}
          </Space>
        }
        {...rest}
      >
        {render}
      </Modal>
      <div style={{ display: 'inline-block' }} onClick={() => setVisible(true)}>
        {children}
      </div>
    </ConfigProviderCom>
  );
};
export default memo(Index);
