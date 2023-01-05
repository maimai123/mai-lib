import React, { forwardRef, useEffect, useImperativeHandle } from 'react';
import { Row, Col, Form, Button, Space, FormProps, RowProps } from 'antd';
import { getLocale } from '@/utils';
import classnames from 'classnames';
import ConfigProviderCom from '@/ConfigProvider';
import matchItem from '../TableFilter/matchItem';
import { IField } from '../TableFilter';

import './index.less';

export interface ActionType {
  getFieldsValue: () => any;
  setFieldsValue: (val: any) => void;
  resetFields: () => void;
  validateFields: () => void;
  handleReset: () => void;
}

export interface FilterFormProps {
  className?: string;
  style?: React.CSSProperties;
  formProps?: FormProps;
  rowProps?: RowProps;
  options?: IField[];
  init?: boolean;
  column?: number; // 一行几个
  showAction?: boolean; // 是否展示默认操作按钮
  onSearch?: (values: any) => void;
  onReset?: () => void;
  renderCustomAction?: () => React.ReactNode;
}

const FilterForm: React.ForwardRefRenderFunction<unknown, FilterFormProps> = (
  props: FilterFormProps,
  parentRef,
) => {
  const {
    className,
    style,
    column = 2,
    formProps,
    rowProps,
    options = [],
    renderCustomAction,
    onSearch,
    onReset,
    init, // 区分从proTable内部还是别的
    showAction = false, // 是否显示操作组，默认不显示
  } = props;

  const [form] = Form.useForm();

  useEffect(() => {
    init && form.setFieldsValue(formProps?.initialValues);
  }, [formProps?.initialValues]); // 监听外部设置更新

  useImperativeHandle(parentRef, () => {
    return {
      ...form,
      handleReset,
    };
  });

  const defaultSpan = 24 / column;

  const handleReset = () => {
    form.resetFields();
    if (onReset) {
      onReset();
    } else if (formProps?.onFinish) {
      const fields = form.getFieldsValue();
      formProps?.onFinish && formProps?.onFinish(fields);
    }
  };

  const handleSubmit = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();
    onSearch && onSearch(values);
  };

  return (
    <ConfigProviderCom>
      <Form
        className={classnames('mm-filter-form', className)}
        style={style}
        form={form}
        colon={false}
        layout="vertical"
        {...formProps}
      >
        <Row gutter={16} className="mm-filter-form-row" {...rowProps}>
          {options
            .sort((a, b) => (a.order || 0) - (b.order || 0))
            .map((item: IField, index: React.Key | null | undefined) => {
              const {
                valueType,
                valueEnum,
                fieldProps,
                filterType,
                show = true,
                customRender,
                colProps,
                ...rest
              } = item;
              return (
                show && (
                  <Col
                    key={index}
                    span={defaultSpan}
                    className="mm-filter-form-col"
                    {...colProps}
                  >
                    <Form.Item {...rest}>{matchItem(item)}</Form.Item>
                  </Col>
                )
              );
            })}
        </Row>
        <Form.Item>
          <Space size={12}>
            {renderCustomAction
              ? renderCustomAction()
              : showAction && (
                  <Space>
                    <Button onClick={handleReset}>
                      {getLocale('common.reset')}
                    </Button>
                    <Button type="primary" onClick={handleSubmit}>
                      {getLocale('common.ok')}
                    </Button>
                  </Space>
                )}
          </Space>
        </Form.Item>
      </Form>
    </ConfigProviderCom>
  );
};

export default forwardRef(FilterForm);
