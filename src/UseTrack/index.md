---
group:
  title: 埋点track工具
  order: 21
---

### 埋点 组件

```tsx
import React, { useState } from 'react';
import { Button } from 'antd';
import webtracing from '@/utils/track';
export default () => {
  // 传参数据结构
  const json = {
    baseInfo: {
      clientHeight: 977,
      clientWidth: 549,
      colorDepth: 24,
      deviceId: 't_13466167-991854d1-da9f0cf52c91fac4',
      gatherAppName: 'chengxh',
      pageId: '13488cb7-57de65e0-8fa72c8ab05eeac7',
      pixelDepth: 24,
      platform: 'Win32',
      screenHeight: 1080,
      screenWidth: 1920,
      sdkVersion: '0.0.1-alpha.8',
      sendTime: 1641518497118,
      sessionId: 's_13488cb7-57de65d5-4621697435f47777',
      vendor: 'Google Inc.',
    },
    eventInfo: [
      {
        eventId: '13488cb7-57de65e0-8fa72c8ab05eeac7',
        eventType: 'pv',
        operateAction: 'back_forward',
        referer: 'http://localhost:8083/contents.html',
        sendTime: 1641518497118,
        title: 'trace performance',
        triggerTime: '1641518497107',
        type: 'pv',
        url: 'http://localhost:8083/event.html',
      },
      {
        dom: 100.2,
        eventId: 'page',
        eventType: 'performance',
        firstbyte: 7.8,
        fmp: 130.7,
        loadon: 145,
        ready: 109.5,
        res: 35.5,
        ssllink: 4.3,
        trans: 0.4,
        ttfb: 2.1,
        tti: 108.4,
        type: 'pagePerformance',
        url: 'http://localhost:8083/event.html',
      },
    ],
  };
  webtracing.init({
    type: 'ym', // 本地local, 友盟 ym
    // testUse: true, 测试环境按钮开
    //  pv: false,  开启页面路由跳转的统计 只统计页面+ url
    // 以下参数本地需要, 三方不需要 type为local时必填
    requestUrl: 'http://192.168.1.222:33199/trackweb/tra',
    appName: 'chengxh',
    event: false,
    performance: false,
    pv: false,
    error: false,
  });
  return (
    <div>
      示例1 本地埋点传参--字段需后端配合--需要初始化 type = local
      <div style={{ marginBottom: 20 }}>
        <Button
          type="primary"
          onClick={() => {
            webtracing.traceCustomEvent(
              {
                category: '查询按钮',
                action: '点击',
                label: '设备管理查询按钮',
                value: '',
                nodeid: '',
              },
              '111',
              '111',
            );
          }}
        >
          埋点传参
        </Button>
      </div>
      示例2 第三方手动埋点传参 --目前使用--需要初始化 type = ym
      <div>
        <Button
          type="primary"
          onClick={() => {
            webtracing.traceCustomEvent({
              category: '查询按钮',
              action: '点击',
              label: '设备管理查询按钮',
              value: 1,
              nodeid: '',
            });
          }}
        >
          三方埋点传参
        </Button>
      </div>
    </div>
  );
};
```

### API

| 属性             | 说明                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | 类型                                                                                                                                                               | 默认值  |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| init             | 配置初始化                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | function                                                                                                                                                           | options |
| traceCustomEvent | 自定义上报事件(调用此方法时发送给后台的 eventType 为 custom, 这是固定的) ; 第三方-手动发送埋点方法 ,各参数含义如下：category：事件类别，必填项，表示事件发生在谁身上，如“视频”、“小说”、“轮显层”等等。action：事件操作，必填项，表示访客跟元素交互的行为动作，如”播放”、”收藏”、”翻层”等等。label：事件标签，选填项，用于更详细的描述事件，从各个方面都可以，比如具体是哪个视频，哪部小说，翻到了第几层等等。value：事件值，选填项，整数型，用于填写打分型事件的分值，加载时间型事件的时长，订单型事件的价格等等。nodeid：div 元素 id，选填项，填写网页中的 div 元素 id 值，用于在“用户视点”功能上重绘元素的事件发生情况。 | function(params: {category: string, action: string, label?: string, value?: int, nodeid?: string}, eventId?:string / int, title?: string ) eventId 和 title 非必填 |         |
| traceError       | 采集错误信息(调用此方法时发送给后台的 eventType 为 error, 这是固定的)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | function                                                                                                                                                           |         |
| tracePerformance | 采集自定义性能数据(调用此方法时发送给后台的 eventType 为 performance, 这是固定的)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | function                                                                                                                                                           |         |
| tracePageView    | 触发一次页面路由采集(调用此方法时发送给后台的 eventType 为 custom, 这是固定的)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | function                                                                                                                                                           |         |

options
| 属性 | 说明 | 类型 | 默认值 |
| ------------ | --------------- | ------------ | ----------------------------------------------------------------- |
| requestUrl | 是否开启触发事件时控制台输出 必填 |string | | |
| type | 本地固定 local 友盟固定 ym | string | - |
| appName | 应用的标记,以此来区分各个应用,必填 | string | - |
| appCode | 应用的 code,附加作用 | string | - |
| appVersion | 应用版本 | string | - |
| ext | 自定义的全局附加参数 | object | - |
| debug | 是否开启触发事件时控制台输出 | boolean | - |
| pv | 当为 boolean 值时: true 代表其所有属性为 true false 代表其所有属性为 false | boolean | - |
| pv.core | 页面跳转 - 是否自动发送页面跳转相关数据 | boolean | - |
| pv.hashtag | 页面跳转 - 浏览器的动作发生时 (例如浏览器的回退按钮)是否监听 hash 变化,如果是 hash 路由请开启此开关 | boolean | - |
| performance | 当为 boolean 值时:true 代表其所有属性为 true false 代表其所有属性为 false | boolean/object | - |
| performance.core | 性能数据 - 是否采集静态资源、接口的相关数据 | boolean | - |
| performance.firstResource | 性能数据 - 是否采集首次进入页面的数据 (ps: tcp 连接耗时,HTML 加载完成时间,首次可交互时间) | boolean | - |
| performance.server | 接口请求 - 是否采集接口请求(成功的才会采集,采集失败的需打开 error.server) | boolean | - |
| error | 当为 boolean 值时:true 代表其所有属性为 true false 代表其所有属性为 false | boolean | - |
| error.core | 是否采集异常数据 (ps: 资源引入错误,promise 错误,控制台输出错误) | boolean | - |
| error.server | 接口请求 - 是否采集报错接口数据 | boolean | - |
| event | 当为 boolean 值时:true 代表其所有属性为 true false 代表其所有属性为 false | boolean/objcet | - |
| event.core | 页面点击 - 是否采集点击事件 | boolean | - |
| event.unload | 页面卸载 - 是否在页面卸载时采集页面状态信息 | boolean | - |

主动上报方法--我们主要采用 traceCustomEvent 手动埋点的方法 --

自动埋点参考配置--需后端配合 基于该文档改造<https://m-cheng-web.github.io/web-tracing-docu/#%E8%A1%8C%E4%B8%BA%E5%9F%8B%E7%82%B9>
