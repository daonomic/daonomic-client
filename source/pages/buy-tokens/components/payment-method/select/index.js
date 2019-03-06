//@flow
import * as React from 'react';
import { observer } from 'mobx-react';
// $FlowFixMe
import { Trans } from '@lingui/macro';
import { Select } from '@daonomic/ui';
import styles from './styles.css';

import type { SaleStore } from '~/domains/business/sale/store';

export type Props = {|
  marker: Function,
  sale: SaleStore,
|};

export const PaymentMethodSelect: React.ComponentType<Props> = observer(
  ({ sale, marker }: Props) => {
    const { selectedMethod: selectedPaymentMethod } = sale.payment;

    if (!selectedPaymentMethod || sale.data.paymentMethods.length === 1) {
      return null;
    }

    const selectId = 'payment-method';

    return (
      <div className={styles.root}>
        <label className={styles.label} htmlFor={selectId}>
          <Trans>I want to pay with</Trans>
        </label>

        <Select
          data-marker={marker('select')()}
          id={selectId}
          value={selectedPaymentMethod.id}
          onChange={(event: SyntheticInputEvent<HTMLSelectElement>) => {
            sale.payment.setMethod(event.target.value);
          }}
        >
          {sale.data.paymentMethods.map(({ id, label }) => (
            <option key={id} value={id}>
              {label}
            </option>
          ))}
        </Select>
      </div>
    );
  },
);
