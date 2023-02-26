---
group:
  title: Toggle 组件
  order: 17
---

### Toggle 组件

弹窗组件

#### Demo: 默认

```tsx
import React from 'react';
import { Toggle, Icon } from 'mai-lib';

export default () => {
  return (
    <Toggle title={<div>点击</div>}>
      <div style={{ background: '#f2f2f2', padding: 20 }}>
        五百里滇池，奔来眼底，披襟岸帻，喜茫茫空阔无边。看东骧神骏，西翥灵仪，北走蜿蜒，南翔缟素。高人韵士，何妨选胜登临。趁蟹屿螺洲，梳裹就风鬟雾鬓；更苹天苇地，点缀些翠羽丹霞，莫辜负四围香稻，万顷晴沙，九夏芙蓉，三春杨柳。 数千年往事，注到心头，把酒凌虚，叹滚滚英雄谁在。想汉习楼船，唐标铁柱，宋挥玉斧，元跨革囊。伟烈丰功，费尽移山心力。尽珠帘画栋，卷不及暮雨朝云；便断碣残碑，都付与苍烟落照。只赢得几杵疏钟，半江渔火，两行秋雁，一枕清霜
      </div>
    </Toggle>
  );
};
```

#### Demo: 箭头跟随

```tsx
import React from 'react';
import { Toggle, Icon } from 'mai-lib';

export default () => {
  return (
    <Toggle title={<div>点击我长命百岁</div>} follow>
      <div style={{ background: '#f2f2f2', padding: 20 }}>
        五百里滇池，奔来眼底，披襟岸帻，喜茫茫空阔无边。看东骧神骏，西翥灵仪，北走蜿蜒，南翔缟素。高人韵士，何妨选胜登临。趁蟹屿螺洲，梳裹就风鬟雾鬓；更苹天苇地，点缀些翠羽丹霞，莫辜负四围香稻，万顷晴沙，九夏芙蓉，三春杨柳。 数千年往事，注到心头，把酒凌虚，叹滚滚英雄谁在。想汉习楼船，唐标铁柱，宋挥玉斧，元跨革囊。伟烈丰功，费尽移山心力。尽珠帘画栋，卷不及暮雨朝云；便断碣残碑，都付与苍烟落照。只赢得几杵疏钟，半江渔火，两行秋雁，一枕清霜
      </div>
    </Toggle>
  );
};
```

#### Demo: 自定义箭头,默认展开,带边框

```tsx
import React from 'react';
import { Toggle, Icon } from 'mai-lib';

export default () => {
  return (
    <Toggle
      title={<div>点击</div>}
      defaultColspan
      bordered
      expandIconPosition='start'
      expandIcon={({ isActive }) => <Icon type="icon-jiantouzhankai" rotate={isActive ? 90 : 0} />}
      onChange={(visible) => {console.log(visible ? '展开啦' : '合起来啦')}}
    >
      <div>
        五百里滇池，奔来眼底，披襟岸帻，喜茫茫空阔无边。看东骧神骏，西翥灵仪，北走蜿蜒，南翔缟素。高人韵士，何妨选胜登临。趁蟹屿螺洲，梳裹就风鬟雾鬓；更苹天苇地，点缀些翠羽丹霞，莫辜负四围香稻，万顷晴沙，九夏芙蓉，三春杨柳。 数千年往事，注到心头，把酒凌虚，叹滚滚英雄谁在。想汉习楼船，唐标铁柱，宋挥玉斧，元跨革囊。伟烈丰功，费尽移山心力。尽珠帘画栋，卷不及暮雨朝云；便断碣残碑，都付与苍烟落照。只赢得几杵疏钟，半江渔火，两行秋雁，一枕清霜
      </div>
    </Toggle>
  );
};
```

### API

| 属性     | 说明                                                            | 类型      | 默认值 |
| -------- | --------------------------------------------------------------- | --------- | ------ |
| className    | 自定义类名   | string        | -      |
| style        | 自定义样式   | CSSProperties | -      |
| title    | 点击区域 | ReactNode | - |
| children    | 收起展开的区域 | ReactNode | - |
| bordered    | 带边框风格 | boolean | false |
| defaultColspan    | 是否默认展开 | Boolean | false |
| expandIcon    | 自定义箭头 | (visible) => ReactNode | - |
| expandIconPosition    | 图标位置 | start \| end | start |
| follow    | expandIconPosition为right时，箭头是否跟随文字，默认在最右边 | boolean | false |
| onChange    | 切换回调 | (visible) => void | - |
