import React, { useState, useCallback } from 'react';
import { Row, Col, Radio } from 'antd';
import classnames from 'classnames';

import './index.less';

export interface IProSelectProps {
  value?: number | string;
  onChange?: (value: number | string | undefined | null) => void;
  options: any;
  readonly?: boolean;
  gutter?: any;
  wrap?: boolean;
}

const ProSelect: React.FC<IProSelectProps> = (props) => {
  const { value, onChange, options, gutter = [24, 24], readonly, wrap } = props;
  const [selectedValue, setSelectedValue] = useState(value);

  const onSelect = useCallback((val: any) => {
    setSelectedValue(val);
    onChange && onChange(val);
  }, []);

  return (
    <Row
      className={classnames('mai-lib-select', {
        'mai-lib-select-pointer': !readonly,
        'mai-lib-select-wrap': wrap,
      })}
      gutter={gutter}
    >
      {options.map((item: any, index: number) => {
        return (
          <Col key={index} span={item.span || 12}>
            <div
              onClick={() => {
                if (readonly || item.readonly) return;
                onSelect(item.value);
              }}
              className={classnames(
                item.value === selectedValue
                  ? 'mai-lib-select-card mai-lib-select-card-active'
                  : 'mai-lib-select-card ',
                readonly || item.readonly ? 'mai-lib-select-card-readonly' : '',
              )}
            >
              <div className="mai-lib-select-radio">
                <Radio
                  disabled={readonly || item.readonly}
                  checked={item.value === selectedValue}
                />
              </div>
              <div className="mai-lib-select-content">
                <div className="mai-lib-select-content-icon">{item.icon}</div>
                <div>{item.text}</div>
              </div>
              {(item.label || item.desc) && (
                <div className="mai-lib-select-list">
                  <div className="mai-lib-select-list-title">{item.label}</div>
                  <div className="mai-lib-select-list-desc">{item.desc}</div>
                </div>
              )}
              {item.slot}
            </div>
          </Col>
        );
      })}
    </Row>
  );
};

export default ProSelect;
