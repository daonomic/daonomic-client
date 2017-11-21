import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './burger.css';

export default class Burger extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    isActive: PropTypes.bool,
  };

  static defaultProps = {
    className: '',
    children: 'Toggle menu',
    isActive: false,
  };

  render() {
    const {
      className,
      children,
      isActive,
      ...restProps
    } = this.props;

    return (
      <button
        className={cn(className, styles.root, {
          [styles.root_active]: isActive,
        })}
        {...restProps}
      >
        <span className={styles.inner}>
          {children}
        </span>
      </button>
    );
  }
}
