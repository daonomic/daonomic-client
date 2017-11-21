import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './badge.css';

export default class Badge extends PureComponent {
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
      <span className={cn(className, styles.root)}>
        {children}
      </span>
    );
  }
}
