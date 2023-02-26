import React, { useEffect } from 'react';
import { useSafeState } from 'ahooks';
import { Form, Row, Col, Space, Button, ColProps } from 'antd';
import { FormProps, FormItemProps } from 'antd/lib/form';
import { UpOutlined, DownOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import matchItem from './matchItem';
import { getLocale } from '@/utils';
import ConfigProviderCom from '@/ConfigProvider';
import './index.less';

export type ValueType =
  | 'text'
  | 'number'
  | 'search'
  | 'textarea'
  | 'select'
  | 'radio'
  | 'checkbox'
  | 'treeSelect'
  | 'date'
  | 'dateRange'
  | 'cascader'
  | 'option'
  | 'custom';

export interface ActionType {
  getFieldsValue: () => any;
  setFieldsValue: (val: any) => void;
  resetFields: () => void;
}

export interface IField extends FormItemProps {
  name: string;
  valueType?: ValueType;
  valueEnum?: Map<any, any>;
  fieldProps?: any; // 透穿给表单项内的组件的 props
  order?: number; // 排序
  show?: boolean; // 是否展示该字段
  filterType?: 'right' | 'table' | 'filter';
  defaultValue?: any;
  customRender?: React.ReactNode;
  colProps?: ColProps;
  disabled?: boolean;
  setting?: boolean;
}

export interface TableFilterProps {
  formProps?: FormProps;
  fields: IField[];
  onSearch: (values: any) => void;
  onReset: () => void;
  className?: string;
  style?: React.CSSProperties;
  actionRef?:
  | React.MutableRefObject<ActionType | undefined>
  | ((actionRef: ActionType) => void);
  mode?: 'fixed' | 'static';
  defaultCollapsed?: boolean;
}

const GUTTER = 16;
const SPAN = 6;
// 收起时展示字段数
const LINE_COUNT = 3;

const TableFilter: React.FC<TableFilterProps> = ({
  formProps,
  fields,
  onSearch,
  onReset,
  className,
  style,
  actionRef,
  mode = 'fixed',
  defaultCollapsed = true,
}) => {
  const [form] = Form.useForm();
  // 是否收起
  const [collapsed, setCollapsed] = useSafeState<boolean>(defaultCollapsed);
  // 是否需要展开收起按钮
  const needCollapsedButton = fields.length > LINE_COUNT;

  useEffect(() => {
    const userAction: ActionType = {
      getFieldsValue: () => form.getFieldsValue(),
      setFieldsValue: (val) => form.setFieldsValue(val),
      resetFields: () => form.resetFields(),
    };

    if (actionRef && typeof actionRef !== 'function') {
      actionRef.current = userAction;
    }
  }, []);

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue(formProps?.initialValues || {});
  }, [formProps?.initialValues]);

  // 实际渲染字段
  const renderFields = (data: IField[]) => {
    return data
      .sort((a, b) => (a.order || 0) - (b.order || 0))
      .map((item, index) => ({
        ...item,
        show: item.show === false ? false : index < LINE_COUNT || !collapsed,
      }));
  };

  // 搜索
  const search = () => {
    const values = form.getFieldsValue();
    onSearch && onSearch(values);
  };

  // 重置
  const reset = async () => {
    await form.resetFields();
    onReset && onReset();
  };

  if (!(fields instanceof Array && fields.length)) return null;
  const showCount = renderFields(fields).filter((item) => item.show).length;
  const offset = (3 - (showCount % (24 / SPAN))) * 6;
  return (
    <ConfigProviderCom>
      <div
        className={classnames(
          'iLab-table-filter',
          collapsed
            ? 'iLab-table-filter-collapsed'
            : 'iLab-table-filter-expanded',
          `iLab-table-filter-${mode}`,
          className,
        )}
        style={style}
      >
        <Form
          className="iLab-table-filter-form"
          layout="vertical"
          form={form}
          {...formProps}
        >
          <Row gutter={GUTTER}>
            {renderFields(fields).map((filed) => {
              const {
                valueEnum,
                valueType,
                fieldProps,
                order,
                show = true,
                filterType,
                customRender,
                ...rest
              } = filed;

              return (
                show &&
                <Col
                  span={SPAN}
                  key={filed.name}
                >
                  <Form.Item {...rest}>{matchItem(filed)}</Form.Item>
                </Col>
              );
            })}
            <Col span={SPAN} offset={offset} key="actions">
              <Form.Item
                label=" "
                noStyle={
                renderFields(fields).filter((item) => item.show).length %
                  (LINE_COUNT + 1) ===
                0
              }
              >
                <div style={{ textAlign: 'right' }}>
                  <Space>
                    <Button
                      className="iLab-table-filter-btn"
                      type="primary"
                      onClick={search}
                    >
                      {getLocale('common.search')}
                    </Button>
                    <Button className="iLab-table-filter-btn" onClick={reset}>
                      {getLocale('common.reset')}
                    </Button>
                  </Space>

                  {needCollapsedButton && (
                  <Button
                    type="link"
                    onClick={() => {
                      setCollapsed(!collapsed);
                    }}
                  >
                    {collapsed ? <>{getLocale('common.expand')} <DownOutlined /></> : <>{getLocale('common.packUp')}<UpOutlined /></>}
                  </Button>
                  )}
                </div>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </ConfigProviderCom>
  );
};

export default TableFilter;
