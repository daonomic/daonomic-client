// @flow
import * as React from 'react';
import cn from 'classnames';
import styles from './two-columns-layout.css';

type Props = {
  className?: string,
  children: React.Node,
};

export default class LeftColumn extends React.PureComponent<Props, {}> {
  render() {
    const { className, children } = this.props;

    return <div className={cn(className, styles.left)}>{children}</div>;
  }
}
