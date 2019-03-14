// @flow
import * as React from 'react';
import { Heading } from '~/components/heading';
import styles from './styles.css';

type Props = {
  children: React.Node,
};

export function Title(props: Props) {
  return (
    <Heading className={styles.root} tagName="h2" size="normal">
      {props.children}
    </Heading>
  );
}
