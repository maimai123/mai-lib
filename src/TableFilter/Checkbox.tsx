import React from 'react';
import { Checkbox as UCheckbox } from 'antd';
import { CheckboxGroupProps } from 'antd/lib/checkbox';

const Checkbox: React.FC<
CheckboxGroupProps & {
  options: Map<any, any>;
}
> = ({ options, ...rest }) => {
  return (
    <UCheckbox.Group
      {...rest}
      options={Array.from(options).map((item) => ({
        label: item[1],
        value: item[0],
      }))}
    />
  );
};

export default Checkbox;
