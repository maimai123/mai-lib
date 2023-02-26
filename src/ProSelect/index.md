---
group:
  title: ProSelect 组件
  order: 16
---

## ProSelect 组件

### ProSelect

```tsx
import React from 'react';
import { ProSelect, Icon } from 'mai-lib';

const options = [
  {
    icon: <Icon type="icon-morenjiaose" style={{ fontSize: 20 }} />,
    text: '企业应用服务者',
    label: <div><span>描述：</span>识别画面中的火光，立即产生报警，通知用户</div>,
    desc: <div><span>实时性：</span>实时报警，通常为1分钟以内</div>,
    value: '1',
    span: 12
  },
  {
    icon: <Icon type="icon-gerenzhongxinxuanzhong" style={{ fontSize: 20 }} />,
    text: '个人应用服务者',
    value: '2',
    span: 8
  },
  {
    icon: <Icon type="icon-gerenzhongxinxuanzhong" style={{ fontSize: 20 }} />,
    text: '个人应用服务者',
    value: '3',
    slot: <div><span>实时性：</span>实时报警，通常为1分钟以内</div>,
    readonly: true
  },
  {
    icon: <Icon type="icon-gerenzhongxinxuanzhong" style={{ fontSize: 20 }} />,
    label: <div><span>描述：</span>识别画面中的火光，立即产生报警，通知用户</div>,
    desc: <div><span>实时性：</span>实时报警，通常为1分钟以内</div>,
    text: '个人应用服务者',
    value: '4',
  },
];

export default () => (
  <div>
    <ProSelect
      value=""
      onChange={val => {
        console.log(val);
      }}
      options={options}
    />
  </div>
);
```

### readonly

```tsx
import React from 'react';
import { ProSelect, Icon } from 'mai-lib';

const options = [
  {
    icon: <Icon type="icon-morenjiaose" style={{ fontSize: 20 }} />,
    text: '企业应用服务者',
    value: '1',
  },
];

export default () => (
  <div>
    <ProSelect readonly options={options} />
  </div>
);
```

### API

| 属性     | 说明     | 类型     | 默认值 |
| -------- | -------- | -------- | ------ |
| value    | 选项值   | string   |        |
| onChange | 选中回调 | function |        |
| gutter  | 栅格间隔，可以写成像素值或支持响应式的对象写法来设置水平间隔 { xs: 8, sm: 16, md: 24}。或者使用数组形式同时设置 [水平间距, 垂直间距] | number \| object \| array    |   [24, 24]   |
| options  | 栅格占位格数，为 0 时相当于 display: none | number    |   12   |
| wrap    | 是否高度保持一致   | boolean   |    false    |
| slot    | 插槽   | children   |        |
| span  | 选项数组 | array    |        |
| readonly | 是否只读 | boolean  | false  |
