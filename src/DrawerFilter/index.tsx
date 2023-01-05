import React, { useRef, useEffect, memo } from 'react';
import { useSafeState } from 'ahooks';
import { Drawer, Button, Space, FormItemProps, ColProps } from 'antd';
import FilterForm, { ActionType as FilterActionType } from '../FilterForm';
import { IField } from '../TableFilter';
import Icon from '@/Icon';
import { DrawerProps } from 'antd/lib/drawer';
import { FormProps } from 'antd/lib/form';
import { getLocale } from '@/utils';
import './index.less';

export interface OptionsType extends FormItemProps {
  colProps?: ColProps;
}

export interface IProps extends DrawerProps {
  options: IField[];
  filterProps?: any;
  okText?: React.ReactNode;
  cancelText?: React.ReactNode;
  onSubmit: (value: any) => void;
  onReset?: () => void;
  callback?: () => void;
  actionRef?:
  | React.MutableRefObject<ActionType | undefined>
  | ((actionRef: ActionType) => void);
  formProps?: FormProps;
  children?: React.ReactNode;
  init?: boolean;
  editTitle?: React.ReactNode;
}
export interface ActionType {
  getFieldsValue: () => any;
  validateFields: () => any;
  setFieldsValue: (val: any) => void;
  resetFields: () => void;
  open: (val: any) => void;
  close: () => void;
}

const Index: React.FC<IProps> = (props: IProps) => {
  const {
    title = getLocale('common.filter'),
    editTitle = getLocale('common.edit'),
    width = 500,
    options,
    filterProps,
    onSubmit,
    onReset,
    onClose,
    actionRef,
    callback,
    okText = getLocale('common.ok'),
    cancelText = getLocale('common.cancel'),
    formProps,
    init,
    children = (
      <Button>
        <Icon type={'icon-biaoge-shaixuan1'} />
        {getLocale('common.filter')}
      </Button>
    ),
    ...rest
  } = props;
  const formRef = useRef<FilterActionType>(null);
  const [visible, setVisible] = useSafeState<boolean>(false);
  const [loading, setLoading] = useSafeState<boolean>(false);
  const [id, setId] = useSafeState<number>();

  useEffect(() => {
    const userAction: ActionType = {
      getFieldsValue: () => {
        const values = formRef?.current?.getFieldsValue();
        return id ? { ...values, id } : values;
      },
      validateFields: async () => {
        await formRef?.current?.validateFields();
      },
      setFieldsValue: (val) => {
        formRef?.current?.setFieldsValue(val);
        if (val?.id) { setId(val?.id); }
      },
      resetFields: () => {
        formRef?.current?.resetFields();
        setId(undefined);
      },
      open: async (initialValue: any) => {
        await setVisible(true);
        setTimeout(() => {
          formRef?.current?.setFieldsValue(initialValue);
          if (initialValue?.id) { setId(initialValue?.id); }
        }, 1);
      },
      close: async () => {
        setVisible(false);
        setLoading(false);
        setId(undefined);
      },
    };

    if (actionRef && typeof actionRef !== 'function') {
      actionRef.current = userAction;
    }
  }, []);

  useEffect(() => {
    if (visible) {
      callback && callback();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const handleSubmit = async () => {
    await formRef?.current?.validateFields();
    const fields = formRef?.current?.getFieldsValue() || {};
    setLoading(true);
    try {
      onSubmit && (await onSubmit(id ? { ...fields, id } : fields));
      setVisible(false);
      setLoading(false);
      setId(undefined);
    } catch (err) {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    formRef.current && (await formRef?.current?.handleReset());
    onReset && onReset();
    setVisible(false);
    setLoading(false);
    setId(undefined);
  };

  return (
    <>
      <Drawer
        title={id ? editTitle : title}
        width={width}
        destroyOnClose
        closable={false}
        extra={
          <Icon
            className="drawer-close"
            type="icon-biaoge-quxiao"
            onClick={() => setVisible(false)}
          />
        }
        onClose={(e) => {
          setVisible(false);
          setLoading(false);
          setId(undefined);
          onClose && onClose(e);
        }}
        visible={visible}
        footer={
          <Space className="drawer-fr">
            <Button onClick={handleReset}>{cancelText}</Button>
            <Button type="primary" onClick={handleSubmit} loading={loading}>
              {okText}
            </Button>
          </Space>
        }
        {...rest}
      >
        <FilterForm
          ref={formRef}
          init={init}
          options={options}
          formProps={formProps}
          {...filterProps}
        />
      </Drawer>
      <div style={{ display: 'inline-block' }} onClick={() => setVisible(true)}>
        {children}
      </div>
    </>
  );
};
export default memo(Index);
