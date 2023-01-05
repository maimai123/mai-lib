---
group:
  title: CardDetail 组件
  order: 10
---

## CardDetail 组件

### 基础用法

```tsx
import React from 'react';
import { Button } from 'antd';
import { CardDetail, Caption } from 'mm-lib';

export default () => {
  const list = [
    { label: '姓名', value: '麦麦1' },
    { label: '姓名', value: '麦麦2', span: 3 },
    { label: '姓名' },
    { label: '姓名', value: '麦麦3' },
    { label: '姓名', value: '麦麦4' },
  ];
  return (
    <CardDetail
      title="标题"
      slot={<Caption>基础信息</Caption>}
      extra={<Button>更多</Button>}
      list={list}
      renderCustom={<div style={{ padding: '0 24px 24px'}}>其他信息</div>}
    />
  );
};
```

### API

| 属性   | 说明                                                                                                                | 类型      | 默认值 |
| ------ | -------- | --------- | ------ |
| list   | 列项 list       | Item 数组 | -      |
| column | 展示几列            | number    | 4      |
| slot | 插槽            | Node    |       |
| renderCustom | 更多信息 | Node    |       |
| descProps      | 属性同 Descriptions，详见 antd [Descriptions 组件](https://ant.design/components/descriptions-cn/#Descriptions) | -         | -      |
