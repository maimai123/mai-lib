---
group:
  title: DrawerFilter 组件
  order: 5
---

### DrawerFilter 组件

抽屉式筛选

Demo: 默认

```tsx
import React, { useState, useRef } from 'react';
import { DrawerFilter } from 'mai-lib';
import { ActionType } from 'mai-lib/lib/DrawerFilter';
import { Input, Button } from 'antd';

export default () => {
  const actionRef = useRef<ActionType>();
  const [sex, setSex] = useState<number>(1);
  const [province, setProvince] = useState(undefined);
  const citys = {
    1: [{ label: '杭州市', value: 1 }],
    2: [{ label: '松江区', value: 12 }],
  };

  const options = [
    {
      label: '姓名',
      name: 'name',
      valueType: 'text',
    },
    {
      label: '性别',
      name: 'sex',
      valueType: 'radio',
      valueEnum: new Map([
        [1, '女'],
        [2, '男'],
      ]),
      fieldProps: {
        onChange: (e) => setSex(e.target.value)
      }
    },
    {
      label: '出生日期',
      name: 'date',
      valueType: 'date',
    },
    {
      label: '活动时间',
      name: 'datetime',
      valueType: 'dateRange',
      show: sex === 2
    },
    {
      label: '省',
      name: 'province',
      valueType: 'select',
      valueEnum: new Map([
        [1, '浙江省'],
        [2, '上海市'],
        [3, '北京市'],
        [4, '广州市'],
      ]),
      fieldProps: {
        onChange: (val) => {
          setProvince(val);
          try {
            actionRef.current.setFieldsValue({
              province: val,
              city: (citys[val] && citys[val][0]?.value) || undefined,
            });
          } catch (err) {
            console.log(err);
          }
        },
      },
    },
    {
      label: '市',
      name: 'city',
      valueType: 'select',
      fieldProps: {
        disabled: !province,
      },
      valueEnum: new Map(
        (citys[province] || []).map((item) => [item.value, item.label]),
      ),
    },
  ];
  return (
    <>
      <DrawerFilter
        actionRef={actionRef}
        options={options}
        width={320}
        filterProps={{
          column: 1,
        }}
        formProps={{
          initialValues: {
            sex: 1
          }
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
      />
    </>
  );
};
```

Demo: 自定义,可通过 actionRef 手动设置字段值, 如需等数据提交完成后关闭抽屉可使用 promise 返回，如下操作 3 秒后关调抽屉

```tsx
import React, { useRef } from 'react';
import { DrawerFilter } from 'mai-lib';
import { Input, Button } from 'antd';
import { ActionType } from './index';

export default () => {
  const ref = useRef<ActionType>();
  const options = [
    {
      label: '服务商名称',
      name: 'name',
      rules: [{ required: true, message: '请输入服务商名称' }],
    },
    {
      label: '负责人',
      name: 'people',
    },
    {
      label: '联系方式',
      name: 'phone',
    },
    {
      label: '邮箱',
      name: 'email',
    },
    {
      label: '地址',
      name: 'address',
    },
    {
      label: '银行信息',
      name: 'message',
    },
    {
      label: '银行账户',
      name: 'account',
    },
    {
      label: '图片',
      name: 'pic',
    },
    {
      label: '备注',
      name: 'remark',
      valueType: 'custom',
      customRender: (
        <Input.TextArea
          showCount
          rows={4}
          maxLength={200}
        />
      ),
    },
  ];
  return (
    <>
      <DrawerFilter
        options={options}
        actionRef={ref}
        title="新增"
        callback={() => {
          console.log('打开弹窗回调')
        }}
        onSubmit={(values) => {
          console.log(values);
          return new Promise((r, j) => {
            setTimeout(() => {
              r();
            }, 3000);
          });
        }}
      >
        <Button>新增</Button>
      </DrawerFilter>
      <div style={{ marginTop: 10 }}>
        <Button
          onClick={() => {
          ref?.current.open({name: '设置', id: 1 })
          }}
          >
          编辑
        </Button>
      </div>

    </>
  );
};
```

### API

#### DrawerFilter

| 属性               | 说明                                                            | 类型             | 默认值 |
| ------------------ | --------------------------------------------------------------- | ---------------- | ----- |
| title       | 自定义标题                                                        | ReactNode        | 筛选      |
| editTitle       | 编辑自定义标题                                                        | ReactNode        | 编辑      |
| width       | 宽度                                                              | number           | 500 |
| filterProps | 搜索 prop                                                         | FilterFormProps  | -      |
| onSubmit    | 确定回调                                                          | (values) => void | -      |
| onReset     | 重置回调                                                          | () => void       | -      |
| callback     | 打开抽屉回调                                                          | () => void       | -      |
| okText      | 确定文案                                                          | ReactNode        |   查询 |
| cancelText  | 取消文案                                                          | ReactNode        | 重置   |
| children    | 自定义点击区域                                                    | ReactNode        | button |
| -           | 其他属性同 [Drawer](https://ant.design/components/drawer-cn/#API) |

#### FilterFormProps

| 属性               | 说明                                                            | 类型             | 默认值 |
| ------------------ | --------------------------------------------------------------- | ---------------- | ------ |
| className          | 自定义类名                                                      | string           | -      |
| style              | 自定义样式                                                      | CSSProperties    | -      |
| options            | 列                                                              | IField[]         | []     |
| onSearch           | 搜索事件                                                        | (values) => void | -      |
| onReset            | 重置事件                                                        | () => void       | -      |
| formProps          | 同 antd [Form 组件](https://ant.design/components/form-cn/#API) | object           | -      |
| rowProps           | 同 antd [Grid 组件](https://ant.design/components/grid-cn/#Row) | object           | -      |
| colProps           | 同 antd [Grid 组件](https://ant.design/components/grid-cn/#Col) | object           | -      |
| column             | 一行展示几个                                                    | number           | 2      |
| showAction         | 是否展示操作按钮                                                | boolean          | false  |
| renderCustomAction | 自定义操作按钮                                                  | ReactNode        |        |

#### IField

| 属性         | 说明                                                                     | 类型                                                                                                                 | 默认值 |
| ------------ | ------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------- | ------ |
| valueType    | 字段展示类型                                                             | `text \| number \| textarea \| select \| treeSelect \| date \| dateRange \| radio \| checkbox \| cascader \| custom` | `text` |
| valueEnum    | 当 valueType 为 select 时，配置可选项                                    | Map                                                                                                                  | -      |
| fieldProps   | 透传给查询组件的属性                                                     | object                                                                                                               | -      |
| order        | 筛选项权重，权重大的在前                                                 | number                                                                                                               | 0      |
| customRender | 自定义元素（valueType 为 custom 时有效）                                 | React.reactNode                                                                                                      | 0      |
| -            | 其他属性同 [Form.Item](https://ant.design/components/form-cn/#Form.Item) |                                                                                                                      | -      |

#### ActionRef 手动触发

有时我们要手动触发 DrawerFilter 的 getFieldsValue 等操作，可以使用 actionRef，提供了一些操作来帮助我们更快的实现需求。

```ts
interface ActionType {
  getFieldsValue: () => object;
  setFieldsValue: (val: any) => void;
  resetFields: () => void;
  open: (val) => void;
  close: () => void;
}

const ref = useRef<ActionType>();

<DrawerFilter actionRef={ref} />;
// 获取表单对象
ref.current.getFieldsValue();
// 设置表单内容
ref.current.setFieldsValue(val);
// 重置表单
ref.current.resetFields();
// 外部打开设置值
ref.current.open(val);
// 手动关闭
ref.current.close();
```

> 编辑的时候传id进去，获取数据也会把id传递出来，不需要额外维护一个id判断是否编辑
