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

export function NavigationItem({
  className,
  isActive,
  href,
  ...restProps
}: Props) {
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
