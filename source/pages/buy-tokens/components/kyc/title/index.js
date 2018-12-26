// @flow
import * as React from 'react';
import { Heading } from '~/components/heading';
import style from './style.css';

type Props = {
  children: React.Node,
};

export class Title extends React.Component<Props> {
  render() {
    return (
      <Heading className={style.root} tagName="h2" size="normal">
        {this.props.children}
      </Heading>
    );
  }
}
