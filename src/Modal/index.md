---
group:
  title: Modal 组件
  order: 14
---

### Modal 组件

弹窗组件

Demo: 默认

```tsx
import React from 'react';
import { Modal } from 'mm-lib';
import { Input, Button } from 'antd';

export default () => {
  return (
    <>
      <Modal
        okText="确定"
        cancelText="取消"
        width={320}
        title="新增"
        render={<div>内容</div>}
        onOk={(e) => {
          return new Promise((resolve, reject) => {
            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
            console.log(e);
          }).catch(() => console.log('Oops errors!'));
        }}
      >
        <Button>点我打开弹窗</Button>
      </Modal>
    </>
  );
};
```

Demo: 配合 FilterForm

```tsx
import React, { useRef } from 'react';
import { Modal, FilterForm } from 'mm-lib';
import { Input, Button } from 'antd';
import { ActionType } from './index';

export default () => {
  const filterRef = useRef();
  const ref = useRef<ActionType>();
  const options = [
    {
      label: '姓名',
      name: 'name',
      valueType: 'text',
      rules: [{ required: true, message: '请输入姓名' }],
    },
    {
      label: '生日',
      name: 'date',
      valueType: 'date',
    },
  ];
  return (
    <>
      <Modal
        okText="确定"
        cancelText="取消"
        width={320}
        title="新增"
        actionRef={ref}
        render={
          <div>
            <FilterForm
              options={options}
              column={1}
              showAction={false}
              ref={filterRef}
            />
          </div>
        }
        onOk={async (e) => {
          await filterRef.current.validateFields();
          const fields = filterRef.current.getFieldsValue();
          // 模拟获取请求异步操作
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve(fields);
              console.log(fields);
            }, 1000);
          }).catch(() => console.log('Oops errors!'));
        }}
      >
        <Button>新增</Button>
      </Modal>

      <Button style={{ marginLeft: 10 }} onClick={async () => {
        ref.current.open(() => {
          filterRef?.current?.setFieldsValue({ name: '麦麦'})
        })
      }}>编辑</Button>
    </>
  );
};
```

Demo: 配合 ProTable

```tsx
import React, { useState } from 'react';
import { Modal, ProTable } from 'mm-lib';
import { Input, Button } from 'antd';

export default () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const columns = [
    { title: '姓名', dataIndex: 'name' },
    { title: '生日', dataIndex: 'date' },
  ];
  const data = [{ id: 12, name: '麦麦', date: '12-2'}, {id: 2, name: '麦麦2', date: '12-22' }]

  const rowSelection = {
    type: 'checkbox',
    selectedRowKeys: selectedRows,
    onChange: (keys) => {
      setSelectedRows(keys);
    },
  };

  return (
    <>
      <Modal
        okText="确定"
        cancelText="取消"
        title="新增"
        destroyOnClose
        callback={() => {
          setSelectedRows([2])
        }}
        render={
          <div>
            <ProTable
              size="mini"
              rowKey="id"
              style={{ padding: 0 }}
              rowSelection={rowSelection}
              columns={columns}
              dataSource={data}
            />
          </div>
        }
        onOk={async (e) => {
          // 模拟获取请求异步操作
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve(selectedRows);
              console.log(selectedRows);
            }, 1000);
          }).catch(() => console.log('Oops errors!'));
        }}
      >
        <Button>点我打开弹窗</Button>
      </Modal>
    </>
  );
};
```

### API

#### Modal

| 属性     | 说明                                                            | 类型      | 默认值 |
| -------- | --------------------------------------------------------------- | --------- | ------ |
| render   | 弹窗内部实现                                                    | ReactNode |        |
| children | 自定义点击区域                                                  | ReactNode | button |
| callback | 弹窗打开以后所做的额外操作                                         | Function |  |
| -        | 其他属性同 [Modal](https://ant.design/components/modal-cn/#API) |

#### ActionRef 手动触发

有时我们要手动触发 Modal 的 open 等操作，可以使用 actionRef，提供了一些操作来帮助我们更快的实现需求。

```ts
interface ActionType {
  open: (val) => void;
  close: () => void;
}

const ref = useRef<ActionType>();

<Modal actionRef={ref} />;
// 外部打开设置值
ref.current.open(val);
// 手动关闭
ref.current.close();
```
