//@flow
import * as React from 'react';
import { Button } from '@daonomic/ui';
import { getKyberWidgetUrl } from '~/domains/third-party/kyber';
import kyberLogo from './kyber.svg';
import styles from './styles.css';

export type Props = {
  saleAddress: string,
  buyerAddress: ?string,
  ethAmount: number,
  children: React.Node,
};

export class KyberButton extends React.Component<Props> {
  render() {
    const {
      saleAddress,
      buyerAddress,
      ethAmount,
      children,
      ...restProps
    } = this.props;

    if (!buyerAddress) {
      return null;
    }

    return (
      <Button
        {...restProps}
        element="a"
        href={getKyberWidgetUrl({
          amount: ethAmount,
          saleAddress,
          buyerAddress,
        })}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img className={styles.logo} src={kyberLogo} alt="" />
        {children}
      </Button>
    );
  }
}
