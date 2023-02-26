---
group:
  title: EditableTable 组件
  order: 16
---

## EditableTable 组件

### 基础用法

```tsx
import React, { useState, useEffect, useRef } from 'react';
import { EditableTable } from 'mai-lib';
import { Space, Button } from 'antd';

export default () => {
  const tableRef = useRef();
  const [dataSource, setDataSource] = useState([
    {
      id: 1,
      name: '麦麦',
      age: '18',
      select: 1,
      address: '浙江杭州',
    },
    {
      id: 2,
      name: '',
      age: '12',
      select: 2,
      address: '浙江杭州',
    },
    {
      id: 4,
      name: '3',
      age: '12',
      select: 2,
      address: '浙江杭州',
    },
    {
      id: 5,
      name: '4',
      age: '12',
      select: 2,
      address: '浙江杭州',
    },
  ]);

  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
      width: 200,
      editable: true,
      fieldProps: (record) => {
        return {
          disabled: record.name === '麦麦',
        };
      },
    },
    {
      title: 'name1',
      dataIndex: 'name1',
      editable: true,
      rules: [{ required: true }],
    },
    {
      title: 'age',
      dataIndex: 'age',
      editable: true,
      fieldProps: {
        type: 'number',
      },
    },
    {
      title: 'select',
      dataIndex: 'select',
      editable: true,
      fieldProps: {
        type: 'select',
        options: new Map([
          [1, 'select-1'],
          [2, 'select-2'],
        ]),
      },
    },
    {
      title: 'multiSelect',
      dataIndex: 'multiSelect',
      editable: true,
      width: 200,
      fieldProps: {
        type: 'select',
        mode: 'multiple',
        options: new Map([
          [1, 'select-1'],
          [2, 'select-2'],
        ]),
      },
    },
    {
      title: 'date',
      dataIndex: 'date',
      editable: true,
      width: 180,
      fieldProps: {
        type: 'date',
        // showTime: true
      },
    },
    {
      title: 'dateRange',
      dataIndex: 'dateRange',
      editable: true,
      width: 300,
      fieldProps: {
        type: 'dateRange',
      },
    },
    {
      title: 'address',
      dataIndex: 'address',
      width: 200,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      fixed: 'right',
      width: 200,
      render: (text, record, index) => (
        <a
          onClick={() => {
            const list = [...dataSource];
            list.splice(index, 1);
            setDataSource(list);
          }}
        >
          删除
        </a>
      ),
    },
  ];

  const handleSave = (data) => {
    setDataSource(data);
  };

  const handleSubmit = async () => {
    await tableRef?.current?.validateFields();
    console.log(dataSource);
  };

  return (
    <>
      <Space>
        <Button onClick={handleSubmit}>校验数据</Button>
        <Button
          onClick={() => {
            setDataSource([
              ...dataSource,
              {
                id: dataSource.length + 3,
                name: 234,
              },
            ]);
          }}
        >
          新增
        </Button>
      </Space>
      <EditableTable
        rowKey="id"
        actionRef={tableRef}
        dataSource={dataSource}
        columns={columns}
        scroll={{ x: 'max-content' }}
        onSave={handleSave}
        columnResize={true}
      />
    </>
  );
};
```

### API

| 属性    | 说明                                                                       | 类型             | 默认值 |
| ------- | -------------------------------------------------------------------------- | ---------------- | ------ |
| columns | 列定义，[ProColumn](#procolumn-列定义)                                     |                  | --     |
| onSave  | 修改回调                                                                   | (values) => void | -      |
|         | 其他属性同 Table [Table 组件](https://ant.design/components/table-cn/#API) | -                | -      |

#### ProColumn 列定义

| 属性       | 说明                                | 类型    | 默认值 |
| ---------- | ----------------------------------- | ------- | ------ |
| editable   | 是否可编辑                          | boolean | false  |
| fieldProps | 组件参数，[FieldProps](#FieldProps) |         | --     |

#### FieldProps 组件参数

| 属性    | 说明                      | 类型                                            | 默认值 |
| ------- | ------------------------- | ----------------------------------------------- | ------ |
| type    | 组件类型                  | `text \| number \| select \| date \| dateRange` | text   |
| options | type 为 select 时需要传入 | Map 键值对，同 ProTable 的[ValueEnum]           | --     |

> actionRef 返回 form 的实例
