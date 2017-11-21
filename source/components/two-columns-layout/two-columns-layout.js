import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './two-columns-layout.css';
import Left from './left';
import Right from './right';

export default class TwoColumnsLayout extends PureComponent {
  static Left = Left;
  static Right = Right;

  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  };

  static defaultProps = {
    className: '',
    children: null,
  };

  render() {
    const {
      className,
      children,
    } = this.props;

    return (
      <div className={cn(className, styles.root)}>
        {children}
      </div>
    );
  }
}
