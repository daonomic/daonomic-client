//@flow
import * as React from 'react';
// $FlowFixMe
import { Trans } from '@lingui/macro';
import { Heading } from '~/components/heading';
import { PaymentsList } from '~/components/payments-list';
import styles from './styles.css';

import type { SaleStore } from '~/domains/business/sale/store';

export type Props = {|
  tokenSymbol: string,
  sale: SaleStore,
|};

export function Payments({ sale }: Props) {
  const { selectedMethod, selectedMethodPayments } = sale.payment;

  if (selectedMethodPayments.length === 0 || !selectedMethod) {
    return null;
  }

  return (
    <React.Fragment>
      <Heading tagName="h3" size="small" className={styles.subtitle}>
        <Trans>Transactions</Trans>
      </Heading>

      <PaymentsList
        tokenSymbol={this.props.tokenSymbol}
        payments={selectedMethodPayments}
        paymentMethod={selectedMethod}
      />
    </React.Fragment>
  );
}
