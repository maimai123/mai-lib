---
group:
  title: Confirm 组件
  order: 15
---

### Confirm 组件

弹窗组件

Demo: 默认

```tsx
import React from 'react';
import { Confirm } from 'mai-lib';
import { Input, Button } from 'antd';

export default () => {
  const handleClick= () => {
    Confirm({
      title: '标题',
      content: '内容',
      onOk: () => {
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!'));
      }
    })
  }
  return (
    <Button onClick={handleClick}>点我打开弹窗</Button>
  );
};
```

### API

#### Confirm

| 属性     | 说明                                                            | 类型      | 默认值 |
| -------- | --------------------------------------------------------------- | --------- | ------ |
| -        | 其他属性同 [Modal](https://ant.design/components/modal-cn/#API) |
