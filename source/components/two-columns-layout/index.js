// @flow
import * as React from 'react';
import cn from 'classnames';
import styles from './two-columns-layout.css';
import { LeftColumn } from './left';
import { RightColumn } from './right';

type Props = {
  className?: string,
  left: React.Node,
  right: React.Node,
};

export function TwoColumnsLayout({ className, left, right }: Props) {
  return (
    <div className={cn(className, styles.root)}>
      <LeftColumn>{left}</LeftColumn>
      <RightColumn>{right}</RightColumn>
    </div>
  );
}
