---
title: 快速上手
order: 0
---

## 引用组件

```sh
yarn add mm-lib
```

## 使用组件

```javascript
import React from 'react';
import { Caption } from 'mm-lib';

const Wrapper: React.SF = () => {
  return (
    <div>
      <Caption title="快速上手" />
    </div>
  );
};

export default Wrapper;
```

## 引用图片压缩组件

```sh
yarn add ilab-tiny -D
```

## 使用图片压缩组件

```sh
npx tiny
```
