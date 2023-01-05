import React from 'react';
import { Input as UInput } from 'antd';
import { TextAreaProps } from 'antd/lib/input';

const Textarea: React.FC<TextAreaProps> = (props) => {
  return <UInput.TextArea autoComplete="off" {...props} />;
};

export default Textarea;
