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
}

const ProSelect: React.FC<IProSelectProps> = (props) => {
  const { value, onChange, options, gutter = [24, 24], readonly } = props;
  const [selectedValue, setSelectedValue] = useState(value);

  const onSelect = useCallback((val: any) => {
    setSelectedValue(val);
    onChange && onChange(val);
  }, []);

  return (
    <Row
      className={classnames('mm-lib-select', {
        'mm-lib-select-pointer': !readonly,
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
                  ? 'mm-lib-select-card mm-lib-select-card-active'
                  : 'mm-lib-select-card ',
                readonly || item.readonly ? 'mm-lib-select-card-readonly' : '',
              )}
            >
              <div className="mm-lib-select-radio">
                <Radio
                  disabled={readonly || item.readonly}
                  checked={item.value === selectedValue}
                />
              </div>
              <div className="mm-lib-select-content">
                <div className="mm-lib-select-content-icon">{item.icon}</div>
                <div>{item.text}</div>
              </div>
            </div>
          </Col>
        );
      })}
    </Row>
  );
};

export default ProSelect;
