import React from 'react';
import { Descriptions, Divider, DescriptionsProps } from 'antd';
import classnames from 'classnames';

import './index.less';

interface Item {
  label: React.ReactNode;
  value: React.ReactNode;
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
  span?: number;
}

export interface ICardDetailProps {
  className?: string;
  style?: React.CSSProperties;
  title?: React.ReactNode;
  list?: Item[];
  column?: number;
  slot?: React.ReactNode;
  renderCustom?: React.ReactNode;
  descProps?: DescriptionsProps;
}

export default function CardDetail(props: ICardDetailProps) {
  const {
    className,
    style,
    list = [],
    column = 4,
    title,
    renderCustom,
    slot,
    descProps,
  } = props;
  return (
    <div className={classnames('mm-cardDetail', className)} style={style}>
      <Descriptions column={column} title={title} {...descProps}>
        {slot && (
          <Descriptions.Item key="slot" span={+column}>
            {slot}
          </Descriptions.Item>
        )}
        {list.map((item: Item, index: number) => (
          <Descriptions.Item key={index} {...item}>
            {item.value || '-'}
          </Descriptions.Item>
        ))}
      </Descriptions>
      {renderCustom && <Divider />}
      {renderCustom}
    </div>
  );
}
