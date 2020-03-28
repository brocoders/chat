import * as React from 'react';
import cx from 'classnames';
import styles from './popower.module.css';

interface Props {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

function PopOwer({ children, className, style }: Props) {
  return (
    <div className={cx(styles.container, className)} style={style}>
      {
        children
      }
    </div>
  )
}

export default PopOwer;
