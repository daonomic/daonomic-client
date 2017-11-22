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
    tagName: PropTypes.string,
    children: PropTypes.node,
  };

  static defaultProps = {
    size: sizes.normal,
    className: '',
    tagName: 'button',
    children: null,
  };

  render() {
    const {
      className,
      size,
      tagName,
      ...restProps
    } = this.props;

    restProps.className = cn(className, styles.root, {
      [styles[`root_size_${size}`]]: size,
    });

    return React.createElement(tagName, restProps);
  }
}

export default Button;
