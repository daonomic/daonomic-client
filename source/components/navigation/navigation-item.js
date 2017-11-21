import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './navigation.css';

export default class NavigationItem extends Component {
  static propTypes = {
    href: PropTypes.string.isRequired,
    className: PropTypes.string,
    children: PropTypes.node,
    isActive: PropTypes.bool,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    className: '',
    children: null,
    isActive: false,
    onClick: () => {},
  };

  handleClick = (event) => {
    const { href, onClick } = this.props;
    const shouldOpenInNewTab = event.metaKey || event.ctrlKey || event.button === 1;

    if (!event.defaultPrevented && !shouldOpenInNewTab) {
      event.preventDefault();
      onClick(href);
    }
  };

  render() {
    const {
      className,
      children,
      isActive,
      href,
    } = this.props;

    return (
      <a
        className={cn(className, styles.link, {
          [styles.link_active]: isActive,
        })}
        href={href}
        onClick={this.handleClick}
      >
        {children}
      </a>
    );
  }
}
