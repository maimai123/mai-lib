import React from 'react';
import Icon from '@/Icon';
import { Collapse } from 'antd';
import classnames from 'classnames';
import './index.less';

interface IProps {
  className?: string;
  style?: React.CSSProperties;
  title: React.ReactNode;
  children?: React.ReactNode;
  defaultColspan?: boolean;
  expandIcon?: (panelProps: any) => React.ReactNode;
  expandIconPosition?: 'left' | 'right' | 'start' | 'end';
  follow?: boolean;
  bordered?: boolean;
  onChange?: (visible: boolean) => void;
}

const { Panel } = Collapse;

const Index = (props: IProps) => {
  const {
    className,
    style,
    title,
    children,
    expandIcon = ({ isActive }) => <Icon type="icon-xiaojiantou-you" style={{ fontSize: 20 }} rotate={isActive ? 90 : -90} />,
    expandIconPosition = 'end',
    follow,
    bordered = false,
    onChange,
    defaultColspan,
  } = props;
  return (
    <Collapse
      className={classnames('iLab-toggle', className, follow && 'iLab-toggle__follow')}
      bordered={bordered}
      defaultActiveKey={defaultColspan ? ['1'] : []}
      expandIcon={expandIcon}
      style={style}
      expandIconPosition={expandIconPosition}
      onChange={(keys: any) => onChange && onChange(keys.includes('1'))}
    >
      <Panel header={title} key="1">
        {children}
      </Panel>
    </Collapse>
  );
};
export default Index;
