import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './panel.css';
import Separator from './separator';

const paddingSizes = {
  normal: 'normal',
  large: 'large',
};

export default class Panel extends PureComponent {
  static Separator = Separator;
  static paddingSizes = paddingSizes;

  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    paddingSize: PropTypes.oneOf(Object.values(paddingSizes)),
  };

  static defaultProps = {
    className: '',
    children: null,
    paddingSize: paddingSizes.normal,
  };

  render() {
    const {
      className,
      children,
      paddingSize,
    } = this.props;

    return (
      <section
        className={cn(className, styles.root, {
          [styles[`root_padding_${paddingSize}`]]: paddingSize,
        })}
      >
        {children}
      </section>
    );
  }
}
