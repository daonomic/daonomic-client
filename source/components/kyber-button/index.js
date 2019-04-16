//@flow
import * as React from 'react';
import { Button } from '@daonomic/ui';
import kyberLogo from './kyber.svg';
import styles from './styles.css';

export type Props = {
  children: React.Node,
};

export class KyberButton extends React.Component<Props> {
  render() {
    const { children, ...restProps } = this.props;

    return (
      <Button {...restProps}>
        <img className={styles.logo} src={kyberLogo} alt="" />
        {children}
      </Button>
    );
  }
}
