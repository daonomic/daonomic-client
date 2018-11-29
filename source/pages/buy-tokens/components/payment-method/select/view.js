//@flow
import * as React from 'react';
import { Select } from '@daonomic/ui';
import { getTranslation } from '~/domains/app/i18n';
import styles from './styles.css';

import * as PaymentMethodTypes from '~/domains/business/payment-method/types';

export type Props = {|
  marker: Function,
  paymentMethods: PaymentMethodTypes.Data[],
  selectedPaymentMethod: ?PaymentMethodTypes.Data,
  onChange(PaymentMethodTypes.Id): void,
|};

export class PaymentMethodSelect extends React.Component<Props> {
  handleChangePaymentMethod = (
    event: SyntheticInputEvent<HTMLSelectElement>,
  ) => {
    this.props.onChange(event.target.value);
  };

  render() {
    const { paymentMethods, selectedPaymentMethod } = this.props;
    const selectId = 'payment-method';

    if (!selectedPaymentMethod || paymentMethods.length === 1) {
      return null;
    }

    return (
      <div className={styles.root}>
        <label className={styles.label} htmlFor={selectId}>
          {getTranslation('paymentMethods:wantToPayWith')}
        </label>

        <Select
          data-marker={this.props.marker('select')()}
          id={selectId}
          value={selectedPaymentMethod.id}
          onChange={this.handleChangePaymentMethod}
        >
          {paymentMethods.map(({ id, label }) => (
            <option key={id} value={id}>
              {label}
            </option>
          ))}
        </Select>
      </div>
    );
  }
}
