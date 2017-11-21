import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './meter.css';

export default class Meter extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    value: PropTypes.number,
  };

  static defaultProps = {
    className: '',
    value: 0,
  };

  render() {
    const {
      className,
      value,
    } = this.props;

    return (
      <svg className={cn(className, styles.root)}>
        <rect
          className={cn(styles.bar, styles.bar_background)}
          x="0"
          y="0"
          width="100%"
          height="100%"
        />

        <rect
          className={cn(styles.bar, styles.bar_foreground)}
          x="0"
          y="0"
          width={`${value * 100}%`}
          height="100%"
        />
      </svg>
    );
  }
}
