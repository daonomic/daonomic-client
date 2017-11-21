import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './navigation.css';
import NavigationItem from './navigation-item';

export default class Navigation extends Component {
  static Item = NavigationItem;

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
      <nav className={cn(className, styles.root)}>
        <ul className={styles.list}>
          {React.Children.map(children, (child) => (
            <li className={styles.item}>
              {child}
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}
