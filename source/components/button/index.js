import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './button.css';

const sizes = {
  normal: 'normal',
  small: 'small',
};

class Button extends PureComponent {
  static sizes = sizes;

  static propTypes = {
    size: PropTypes.oneOf(Object.values(sizes)),
    className: PropTypes.string,
    children: PropTypes.node,
  };

  static defaultProps = {
    size: sizes.normal,
    className: '',
    children: null,
  };

  render() {
    const {
      className,
      size,
      ...restProps
    } = this.props;

    return (
      <button
        className={cn(className, styles.root, {
          [styles[`root_size_${size}`]]: size,
        })}
        {...restProps}
      />
    );
  }
}

export default Button;
