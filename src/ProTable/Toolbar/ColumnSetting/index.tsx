import { getLocale } from '@/utils';
import { Checkbox, Typography } from 'antd';
import React, { useContext } from 'react';

import TableContext from '../../context';

import './index.less';

interface ColumnSettingProps {}

const ColumnSetting: React.FC<ColumnSettingProps> = () => {
  const { id, columns, checkFlip, selectedDataIndex, setSelectedDataIndex } =
    useContext(TableContext);
  const options: any = columns
    .map((item) => ({
      label: item.title,
      value: item.dataIndex,
      disabled: item.disabled || false,
    }))
    .filter((it) => it.value !== 'operate_m');

  return (
    <div className="mm-pro-table-toolbar-column-setting">
      <div className="mm-pro-table-toolbar-column-setting-header">
        <span className="mm-pro-table-toolbar-column-setting-header-text">
          {getLocale('common.column')}
        </span>
        <div>
          <Typography.Link
            onClick={() => {
              const defaultChecked = columns.filter(
                (item) =>
                  !(
                    item.disabled && !(checkFlip ? item.setting : !item.setting)
                  ),
              );
              localStorage.setItem(
                `${window.location.pathname}-${id}-Col`,
                defaultChecked.map((item) => item.dataIndex).join(),
              );
              setSelectedDataIndex(
                defaultChecked.map((item) => item.dataIndex),
              );
            }}
          >
            {getLocale('common.selectAll')}
          </Typography.Link>
          <Typography.Link
            style={{ marginLeft: 6 }}
            onClick={() => {
              const filterColumn = columns.filter((it) =>
                checkFlip ? it.setting : !it.setting,
              );
              localStorage.setItem(
                `${window.location.pathname}-${id}-Col`,
                filterColumn.map((item) => item.dataIndex).join(),
              );
              setSelectedDataIndex(filterColumn.map((item) => item.dataIndex));
            }}
          >
            {getLocale('common.reset')}
          </Typography.Link>
        </div>
      </div>
      <div className="mm-pro-table-toolbar-column-setting-body">
        <Checkbox.Group
          options={options}
          value={selectedDataIndex}
          onChange={(checkedValue) => {
            localStorage.setItem(
              `${window.location.pathname}-${id}-Col`,
              checkedValue.join(),
            );
            setSelectedDataIndex(checkedValue as string[]);
          }}
        />
      </div>
    </div>
  );
};

export default ColumnSetting;
