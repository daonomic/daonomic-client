import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './two-columns-layout.css';

export default class RightColumn extends PureComponent {
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
      <div className={cn(className, styles.right)}>
        {children}
      </div>
    );
  }
}
