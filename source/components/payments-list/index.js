// @flow
import * as React from 'react';
import { getTranslation } from '~/domains/app/i18n';
import styles from './styles.css';
import { getEtherscanTransactionUrl } from '~/modules/etherscan';

import type { Payment } from '~/types/payment';
import * as PaymentMethodTypes from '~/domains/business/payment-method/types';

export type Props = {|
  tokenSymbol: string,
  payments: Payment[],
  paymentMethod: PaymentMethodTypes.Data,
|};

export class PaymentsList extends React.Component<Props> {
  renderPaymentStatus = (payment: Payment) => {
    switch (payment.status) {
      case 'COMPLETED': {
        return 'finished';
      }

      case 'ERROR': {
        return 'error';
      }

      default: {
        return 'pending';
      }
    }
  };

  renderEtherscanLink = (payment: Payment) => {
    if (payment.status !== 'COMPLETED') {
      return null;
    }

    return (
      <a
        href={getEtherscanTransactionUrl(payment.txHash)}
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
              {getTranslation(
                `paymentsList:${this.renderPaymentStatus(payment)}`,
              )}
              &nbsp;
              {this.renderEtherscanLink(payment)}
            </p>
          </li>
        ))}
      </ul>
    );
  }
}
