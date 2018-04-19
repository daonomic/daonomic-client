// @flow
import * as React from 'react';
import cn from 'classnames';
import styles from './navigation.css';
import { UnstyledLink } from '~/components/link';

type Props = {
  children: React.Node,
  href: string,
  className?: string,
  isActive?: boolean,
};

export default class NavigationItem extends React.Component<Props> {
  render() {
    const { className, isActive, href, ...restProps } = this.props;

    return (
      <UnstyledLink
        {...restProps}
        className={cn(className, styles.link, {
          [styles.link_active]: isActive,
        })}
        href={href}
      />
    );
  }
}
