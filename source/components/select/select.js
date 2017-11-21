import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './select.css';

export default class Select extends PureComponent {
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
      ...restProps
    } = this.props;

    return (
      <div className={cn(className, styles.root)}>
        <select {...restProps}>
          {children}
        </select>
      </div>
    );
  }
}
