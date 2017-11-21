import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './page.css';

export default class PageHeader extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
  };

  static defaultProps = {
    children: null,
  };

  render() {
    const { children, ...restProps } = this.props;

    return (
      <header className={styles.header} {...restProps}>
        {children}
      </header>
    );
  }
}
