import React, { useEffect, useContext, useRef } from 'react';
import { useSafeState, usePrevious } from 'ahooks';
import { Table, Form, TableProps } from 'antd';
import EditableContext from './context';
import ConfigProviderCom from '@/ConfigProvider';
import matchItem from './matchItem';
import classnames from 'classnames';
import { getLocale } from '@/utils';
import noDataPng from '@/assets/noData.png';
import _ from 'lodash';

import './index.less';
import '../ProTable/index.less';
import ResizableTitle from '@/ProTable/ResizableTitle';

const EditableRow: React.FC = (props: any) => {
  return <tr {...props} />;
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children?: React.ReactNode;
  dataIndex: string;
  record: any;
  fieldProps: any;
  rules?: any[];
  dataRowKey: number;
  handleSave: (record: any) => void;
}

const EditableCell: React.FC<EditableCellProps> = (
  props: EditableCellProps,
) => {
  const {
    children,
    editable,
    dataIndex,
    rules,
    fieldProps = {},
    record,
    title,
    dataRowKey,
    handleSave,
    ...restProps
  } = props;
  const inputRef = useRef<any>();
  const form = useContext(EditableContext);

  const renderCell = () => {
    const formParams = {
      name: [dataRowKey, dataIndex],
      rules: rules || [],
      initialValue: record[dataIndex],
    };

    const onSave = async () => {
      try {
        // await form?.validateFields();
        const values = form?.getFieldsValue();
        handleSave({ ...record, ...values[dataRowKey] });
      } catch (err) {
        // @ts-ignore
        const { values } = err;
        if (values && values[dataRowKey]) {
          handleSave({ ...record, ...values[dataRowKey] });
        }
        inputRef?.current?.focus();
      }
    };

    if (['text', 'number'].includes(fieldProps?.type)) {
      fieldProps.onInput = _.debounce(() => {
        onSave();
      }, fieldProps?.delay || 100);
    }
    if (!['text'].includes(fieldProps?.type)) {
      fieldProps.onChange = () => {
        onSave();
      };
    }

    return (
      <Form.Item {...formParams} style={{ margin: 0 }}>
        {matchItem(fieldProps)}
      </Form.Item>
    );
  };

  return (
    <td {...restProps}>
      {editable ? (
        <EditableContext.Consumer>{renderCell}</EditableContext.Consumer>
      ) : (
        children
      )}
    </td>
  );
};

interface EditableTableProps extends TableProps<any> {
  className?: string;
  style?: React.CSSProperties;
  onSave: (val: any, index: number) => void;
  actionRef?: React.MutableRefObject<any> | ((actionRef: any) => void);
  columnResize?: boolean;
}

const EditableTable: React.FC<EditableTableProps> = (
  props: EditableTableProps,
) => {
  const {
    className,
    style,
    columns = [],
    rowKey,
    dataSource,
    columnResize = false,
    onSave,
    actionRef,
    ...rest
  } = props;
  const [form] = Form.useForm();
  const [loading, setLoading] = useSafeState(false);
  const [tableColumns, setTableColumns] = useSafeState<any[]>([]);
  useEffect(() => {
    // 设置表格字段内容
    setTableColumns(columns);
  }, [columns]);
  useEffect(() => {
    if (actionRef && typeof actionRef !== 'function') {
      actionRef.current = form;
    }
  }, []);

  const preList = usePrevious(dataSource);

  useEffect(() => {
    if (preList?.length !== dataSource?.length) {
      refresh();
    }
  }, [dataSource]);

  const refresh = async () => {
    setLoading(true);
    await form.resetFields();
    setLoading(false);
  };
  const handleResize =
    (index: number) =>
      (e: any, { size }: any) => {
        const nextColumns = [...tableColumns];
        nextColumns[index] = {
          ...nextColumns[index],
          // @ts-ignore
          width: size.width,
        };
        setTableColumns(nextColumns);
      };

  const components = columnResize
    ? {
      body: { row: EditableRow, cell: EditableCell },
      header: { cell: ResizableTitle },
    }
    : {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };

  const handleSave = (row: any) => {
    // @ts-ignore
    const newData = [...dataSource];
    // @ts-ignore
    const index = newData.findIndex((item) => row[rowKey] === item[rowKey]);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    onSave && onSave(newData, index);
  };

  const resetColumns = tableColumns.map((col: any, index) => {
    if (!col?.editable) {
      return {
        ...col,
        onHeaderCell: (column: any) => ({
          minWidth: col?.minWidth,
          width: column.width,
          onResize: handleResize(index),
        }),
      };
    }
    return {
      ...col,
      onCell: (record: any, rowIndex: number) => ({
        record,
        editable: col?.editable,
        dataIndex: col?.dataIndex,
        title: col.title,
        rules: col?.rules,
        fieldProps:
          col?.fieldProps && typeof col?.fieldProps === 'function'
            ? col?.fieldProps(record)
            : col?.fieldProps,
        dataRowKey: rowIndex,
        handleSave,
      }),
      onHeaderCell: (column: any) => ({
        minWidth: col?.minWidth,
        width: column.width,
        onResize: handleResize(index),
      }),
    };
  });

  return (
    <ConfigProviderCom >
      <div
        className={classnames(
          'iLab-pro-table',
          'iLab-editableTable',
          className,
        )}
        style={style}
      >
        <Form
          form={form}
          component={false}
          scrollToFirstError={{ behavior: 'smooth' }}
        >
          <EditableContext.Provider value={form}>
            <Table
              components={components}
              loading={loading}
              locale={{
                emptyText: (
                  <div className="empty-container">
                    <img src={noDataPng} />
                    <div>{getLocale('common.noData')}</div>
                  </div>
                ),
              }}
              bordered
              dataSource={dataSource}
              columns={resetColumns}
              rowKey={rowKey}
              {...rest}
            />
          </EditableContext.Provider>
        </Form>
      </div>
    </ConfigProviderCom>
  );
};

export default EditableTable;
