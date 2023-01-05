import React, { useEffect, useRef } from 'react';
import { useSafeState } from 'ahooks';
import classnames from 'classnames';
import { getLocale } from '@/utils';

import styles from './index.less';

interface IProps {
  // 内容
  content: string;
  // 最多展示几行 (默认两行)
  row?: number;
  // 展开收起文案
  text?: {
    expend: string;
    close: string;
  };
  // ...
  ellipsisText: string;
}

const EllipsisLine: React.FC<IProps> = (props: IProps) => {
  const {
    content,
    row = 2,
    text = { expend: getLocale('ellipsisLine.showAll'), close: getLocale('ellipsisLine.packUp') },
    ellipsisText,
  } = props;
  const [visible, setVisible] = useSafeState(false);
  // 是否需要展开更多
  const [isMore, setIsMore] = useSafeState(false);
  const longRef = useRef(null);
  const shortRef = useRef(null);

  useEffect(() => {
    const { clientHeight: shortHeight } = shortRef?.current || {
      clientHeight: 0,
    };
    const { clientHeight: longHeight } = longRef?.current || {
      clientHeight: 0,
    };
    if (longHeight > shortHeight) {
      setIsMore(true);
    }
  }, [content]);

  return (
    <div className={styles.ellipsis}>
      {/* 表示字符串截取部分 */}
      <div
        className={classnames(
          styles['ellipsis-container'],
          styles[`rows-${(!visible && row)}`],
        )}
        ref={shortRef}
      >
        {content}
      </div>
      <div ref={longRef} className={styles['ellipsis-hidden']}>
        {content}
      </div>
      {isMore && (
        <div
          className={styles['ellipsis-more']}
          onClick={() => setVisible(!visible)}
        >
          {visible ? (
            <div>{text.close}</div>
          ) : (
            <>
              <span>{ellipsisText}</span>
              <div>{text.expend}</div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default EllipsisLine;
