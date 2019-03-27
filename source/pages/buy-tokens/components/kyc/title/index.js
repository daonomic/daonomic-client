// @flow
import * as React from 'react';
import { Heading } from '~/components/heading';
import styles from './style.css';

type Props = {
  children: React.Node,
  sub?: React.Node,
};

export function Title(props: Props) {
  return (
    <div className={styles.root}>
      <Heading className={styles.heading} tagName="h2" size="normal">
        {props.children}
      </Heading>
      {props.sub && <p>{props.sub}</p>}
    </div>
  );
}
