// @flow
import * as React from 'react';
import cn from 'classnames';
import styles from './burger.css';

type Props = {
  className?: string,
  children: React.Node,
  isActive: boolean,
};

export class Burger extends React.PureComponent<Props, {}> {
  static defaultProps = {
    children: 'Toggle menu',
  };

  render() {
    const { className, children, isActive, ...restProps } = this.props;

    return (
      <button
        className={cn(className, styles.root, {
          [styles.root_active]: isActive,
        })}
        {...restProps}
      >
        <span className={styles.inner}>{children}</span>
      </button>
    );
  }
}
