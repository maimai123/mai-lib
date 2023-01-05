import React from 'react';
import { createFromIconfontCN } from '@ant-design/icons';

interface Props {
  type: string;
  urls?: string[];
  style?: React.CSSProperties;
  className?: string;
  rotate?: number;
  spin?: boolean;
  onClick?: (val?: any) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onBlur?: () => void;
}
const IconFont = createFromIconfontCN({
  scriptUrl: ['//at.alicdn.com/t/c/font_2601113_btfszkmvdsk.js'],
});

export default function Icon(props: Props): JSX.Element {
  return <IconFont {...props} />;
}
