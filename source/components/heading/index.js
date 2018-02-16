// @flow
import * as React from 'react';
import cn from 'classnames';
import styles from './heading.css';

type Props = {
  className?: string,
  children: React.Node,
  tagName: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6',
  size: 'small' | 'normal' | 'large',
};

export default class Heading extends React.PureComponent<Props, {}> {
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
