import React from 'react';
import { Table, Transfer, TransferProps } from 'antd';
import './index.less';
import { difference } from 'lodash';

interface PaginationType {
  pageSize?: number;
  pageNum?: number;
}
interface IProps extends TransferProps<any> {
  leftColumns?: any[];
  rightColumns?: any[];
  allTargets: any[];
  layout?: 'horizontal' | 'vertical';
  onChangePage?: (pager: any, direction: string) => void;
  paginationRight?: PaginationType;
  paginationLeft?: PaginationType;
}
const TransferTable = ({
  leftColumns,
  rightColumns,
  dataSource,
  allTargets,
  layout = 'horizontal',
  onChangePage,
  paginationRight,
  paginationLeft,
  targetKeys,
  ...restProps
}: IProps) => (
  <Transfer
    {...restProps}
    className={layout === 'horizontal' ? 'lineTrans' : 'verticalTrans'}
  >
    {({
      direction,
      onItemSelectAll,
      onItemSelect,
      selectedKeys: listSelectedKeys,
      disabled: listDisabled,
    }) => {
      const columns = direction === 'left' ? leftColumns : rightColumns;

      const rowSelection: any = {
        getCheckboxProps: (item: any) => ({
          disabled: listDisabled || item?.disabled,
        }),
        onSelectAll(selected: any, selectedRows: any) {
          const treeSelectedKeys = selectedRows
            .filter((item: any) => !item?.disabled)
            .map((item: any) => item?.id);
          const diffKeys = selected
            ? difference(treeSelectedKeys, listSelectedKeys)
            : difference(listSelectedKeys, treeSelectedKeys);
          onItemSelectAll(diffKeys, selected);
        },
        onSelect({ id }: any, selected: any) {
          onItemSelect(id, selected);
        },
        selectedRowKeys: listSelectedKeys,
      };
      const arr: any = [];
      // eslint-disable-next-line array-callback-return
      targetKeys?.map((item: any) => {
        // eslint-disable-next-line array-callback-return
        (dataSource || []).map((obj: any) => {
          if (item === obj.id) {
            arr.push(obj);
          }
        });
      });
      // const rightDataSource = dataSource.filter((item: any) => targetKeys?.includes(item.id))

      const leftDataSource = (dataSource || []).map((item: any) => ({
        ...item,
        disabled: allTargets?.includes(item.id),
      }));
      const handleTableChange = (paginationObj: any) => {
        if (direction === 'left') {
          const pager = { ...paginationLeft };
          pager.pageNum = paginationObj.current;
          pager.pageSize = paginationObj.pageSize;
          onChangePage && onChangePage(pager, 'left');
        } else {
          const pager2 = { ...paginationRight };
          pager2.pageNum = paginationObj.current;
          pager2.pageSize = paginationObj.pageSize;
          onChangePage && onChangePage(pager2, 'right');
        }
      };

      return (
        <Table
          rowKey="id"
          rowSelection={direction === 'left' ? rowSelection : false}
          columns={columns}
          dataSource={direction === 'left' ? leftDataSource : arr}
          size="small"
          pagination={
            (direction === 'right' && paginationRight) ||
            (direction === 'left' && paginationLeft) ||
            false
          }
          sticky
          style={{ pointerEvents: listDisabled ? 'none' : undefined }}
          onRow={({ id, disabled: itemDisabled }: any) => ({
            onClick: () => {
              if (itemDisabled || listDisabled) return;
              onItemSelect(id, !listSelectedKeys.includes(id));
            },
          })}
          onChange={
            ((direction === 'right' && paginationRight) ||
              (direction === 'left' && paginationLeft))
              ? handleTableChange
              : undefined
          }
        />
      );
    }}
  </Transfer>
);
export default TransferTable;
