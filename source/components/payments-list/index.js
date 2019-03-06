// @flow
import * as React from 'react';
// $FlowFixMe
import { Trans } from '@lingui/macro';
import styles from './styles.css';
import { etherscan } from '~/domains/business/etherscan';

import * as PaymentTypes from '~/domains/business/payment/types';
import * as PaymentMethodTypes from '~/domains/business/payment-method/types';

export type Props = {|
  tokenSymbol: string,
  payments: PaymentTypes.Payment[],
  paymentMethod: PaymentMethodTypes.Data,
|};

export class PaymentsList extends React.Component<Props> {
  renderPaymentStatus = (payment: PaymentTypes.Payment) => {
    switch (payment.status) {
      case 'COMPLETED': {
        return <Trans>finished</Trans>;
      }

      case 'ERROR': {
        return <Trans>error</Trans>;
      }

      default: {
        return <Trans>pending</Trans>;
      }
    }
  };

  renderEtherscanLink = (payment: PaymentTypes.Payment) => {
    if (payment.status !== 'COMPLETED') {
      return null;
    }

    return (
      <a
        href={etherscan.getTransactionUrl(payment.txHash)}
        target="_blank"
        rel="noopener noreferrer"
      >
        [tx]
      </a>
    );
  };

  renderPaymentMethodId = () => {
    if (this.props.paymentMethod.id === 'ERC20') {
      return 'ETH';
    }

    return this.props.paymentMethod.id;
  };

  render() {
    return (
      <ul className={styles.list}>
        {this.props.payments.map((payment) => (
          <li key={payment.txHash} className={styles.item}>
            <p className={styles.cell}>
              {new Date(payment.createDate).toLocaleString()}
            </p>

            <p className={styles.cell}>
              {payment.value} {this.renderPaymentMethodId()} →{' '}
              {payment.value * this.props.paymentMethod.rate}{' '}
              {this.props.tokenSymbol}
            </p>

            <p className={styles.cell}>
              {this.renderPaymentStatus(payment)}
              &nbsp;
              {this.renderEtherscanLink(payment)}
            </p>
          </li>
        ))}
      </ul>
    );
  }
}
