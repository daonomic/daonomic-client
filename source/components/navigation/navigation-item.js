// @flow
import * as React from 'react';
import cn from 'classnames';
import styles from './navigation.css';

type Props = {
  className?: string,
  children: React.Node,
  href: string,
  isActive?: boolean,
  onClick: (url: string) => void,
};

export default class NavigationItem extends React.Component<Props, {}> {
  handleClick = (event: MouseEvent) => {
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
