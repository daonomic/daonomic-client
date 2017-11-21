import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './heading.css';

const sizes = {
  small: 'small',
  normal: 'normal',
  large: 'large',
};

export default class Heading extends PureComponent {
  static sizes = sizes;

  static propTypes = {
    tagName: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']).isRequired,
    size: PropTypes.oneOf(Object.values(sizes)).isRequired,
    className: PropTypes.string,
    children: PropTypes.node,
  };

  static defaultProps = {
    className: '',
    children: null,
  };

  render() {
    const {
      tagName,
      size,
      className,
      children,
      ...restProps
    } = this.props;

    const attrs = {
      ...restProps,
      className: cn(className, styles.root, {
        [styles[`root_size_${size}`]]: size,
      }),
    };

    return React.createElement(tagName, attrs, children);
  }
}
