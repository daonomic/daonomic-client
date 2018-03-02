// @flow
import * as React from 'react';
import cn from 'classnames';
import styles from './two-columns-layout.css';
import Left from './left';
import Right from './right';

type Props = {
  className?: string,
  children: React.Node,
};

export default class TwoColumnsLayout extends React.PureComponent<Props, {}> {
  static Left = Left;
  static Right = Right;

  render() {
    const { className, children } = this.props;

    return <div className={cn(className, styles.root)}>{children}</div>;
  }
}
