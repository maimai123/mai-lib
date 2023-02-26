---
group:
  title: TransferTable 组件
  order: 18
---

### TransferTable 组件

table 分页穿梭组件

#### Demo: 默认

```tsx
import React, { useState, useEffect } from 'react';
import { TransferTable } from 'mai-lib';
import { Button, Space } from 'antd';
import { uniq } from 'lodash';
export default () => {
  const [targetKeys, setTargetKeys] = useState<Array<any>>([]);
  const [allTargets, setAllTargets] = useState<any>([]);
  const [pagination, setPagination] = useState<any>({
    pageNum: 1,
    pageSize: 10,
  });
  const [pagination2, setPagination2] = useState<any>({
    pageNum: 1,
    pageSize: 10,
  });
  const handleChange = (nextTargetKeys: any, direction: any, moveKeys: any) => {
    // setType('move')
    setTargetKeys([...targetKeys, ...moveKeys]);
  };
  useEffect(() => {
    const newArr = uniq([...targetKeys]);
    setAllTargets(newArr);
  }, [targetKeys]);
  const leftTableColumns = [
    {
      title: '字段名称',
      dataIndex: 'label',
      ellipsis: true,
      width: 100,
    },
    {
      title: '字段属性',
      dataIndex: 'fieldType',
      width: 100,
      ellipsis: true,
      render: (text: any) => (text === 1 ? '系统字段' : '自定义字段'),
    },
  ];
  const handleMove = (e: any, index: any, type: any) => {
    e.stopPropagation();
    const data = [...targetKeys];
    let data2 = [];
    if (type === 1) {
      data2 = swapArray(data, index - 1, index);
    } else {
      data2 = swapArray(data, index, index + 1);
    }
    setTargetKeys(data2);
  };
  const swapArray = (arr: any, index1: any, index2: any) => {
    arr[index1] = arr.splice(index2, 1, arr[index1])[0];
    return arr;
  };
  const handleDel = (e: any, row: any) => {
    e.stopPropagation();
    const data = [...targetKeys];
    const arr = _.remove(data, function (n) {
      return n !== row.id;
    });
    setTargetKeys(arr);
  };
  const rightTableColumns = (target: any, key: any) => {
    return [
      {
        dataIndex: 'label',
        title: '字段名称',
        ellipsis: true,
        width: 80,
      },
      {
        dataIndex: 'operateOptz',
        title: '操作',
        width: 120,
        render: (text: any, row: any, index: any) => {
          return (
            <Space>
              <a type="text" size="small" onClick={(e) => handleDel(e, row)}>
                删除
              </a>
              <a
                type="text"
                size="small"
                disabled={index === 0 && pagination2.pageNum === 1}
                onClick={(e) =>
                  handleMove(
                    e,
                    (pagination2.pageNum - 1) * pagination2.pageSize + index,
                    1,
                  )
                }
              >
                上移
              </a>
              <a
                type="text"
                size="small"
                disabled={
                  (pagination2.pageNum - 1) * pagination2.pageSize +
                    index +
                    1 ===
                  target.length
                }
                onClick={(e) =>
                  handleMove(
                    e,
                    (pagination2.pageNum - 1) * pagination2.pageSize + index,
                    2,
                  )
                }
              >
                下移
              </a>
            </Space>
          );
        },
      },
    ];
  };
  const dataSource = [];
  for (let i = 1; i < 50; i++) {
    dataSource.push({
      id: i,
      label: '工单编号' + i,
      fieldName: 'work_order_number' + i,
    });
  }
  return (
    <TransferTable
      dataSource={dataSource}
      targetKeys={targetKeys}
      allTargets={allTargets}
      selectAllLabels={[
        (info: any) => {
          return <div>表单字段选择</div>;
        },
        (info: any) => {
          return <div>已选择 （{targetKeys?.length}项）</div>;
        },
      ]}
      //   layout={'vertical'}
      oneWay
      showSelectAll={false}
      onChange={handleChange}
      filterOption={(inputValue: any, item: any) =>
        item.title.indexOf(inputValue) !== -1 ||
        item.tag.indexOf(inputValue) !== -1
      }
      onChangePage={(pager: any, dir: string) => {
        if (dir === 'left') {
          setPagination(pager);
        } else {
          setPagination2(pager);
        }
      }}
      paginationLeft={pagination}
      paginationRight={pagination2}
      leftColumns={leftTableColumns}
      rightColumns={rightTableColumns(targetKeys, 1)}
    />
  );
};
```

### API

| 属性            | 说明                        | 类型                                                           | 默认值       |
| --------------- | --------------------------- | -------------------------------------------------------------- | ------------ |
| dataSource      | 数据源                       | Array                                                          | []           |
| layout          | 布局                         | `horizontal \| vertical`                                       | `horizontal` |
| targetKeys      | 选中的 keys                  | Array                                                          | []           |
| allTargets      | 所有的 key                   | Array                                                          | []           |
| paginationLeft  | 左边框分页参数(左边不分页不传)      | obj<pageNum: number, pageSize: number>                         | -            |
| paginationRight | 右边框分页参数 (右边分页不传)     | obj<pageNum: number, pageSize: number>                         | -            |
| leftColumns     | 左边 table 字段 (同 table)    | Array                                                          | []           |
| rightColumns    | 右边 table 字段 (同 table)   | Array                                                          | []           |
| onChangePage    | 分页切换 (不分页不传)          | function(pager<pageNum: number, pageSize: number>, dir: 'left' | 'right')     | void |

其他 API 同 antd Transfer https://ant-design.gitee.io/components/transfer-cn/
