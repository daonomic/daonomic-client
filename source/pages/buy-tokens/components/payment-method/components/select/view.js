// @flow

import React from 'react';
import { Select } from '@daonomic/ui';
import { markerTreeContext } from '~/providers/marker-tree';
import styles from './styles.css';

// $FlowFixMe
import { Trans } from '@lingui/macro';

import type { PaymentServicePaymentMethod } from '~/domains/business/payment/types';

export type PaymentMethodSelectProps = {|
  paymentMethods: ?(PaymentServicePaymentMethod[]),
  purchasingTokenSymbol: string,
  handleExchangeState: (Function) => void,
  onSelect: (nextPaymentMethod: ?PaymentServicePaymentMethod) => void,
  selectedPaymentMethod: ?PaymentServicePaymentMethod,
|};

export class PaymentMethodSelectView extends React.PureComponent<PaymentMethodSelectProps> {
  componentDidMount() {
    const { paymentMethods, onSelect } = this.props;

    if (paymentMethods) {
      onSelect(paymentMethods[0]);
    }
  }

  componentDidUpdate(prevProps: PaymentMethodSelectProps) {
    const {
      paymentMethods,
      handleExchangeState,
      selectedPaymentMethod,
      onSelect,
    } = this.props;

    if (!prevProps.paymentMethods && paymentMethods) {
      onSelect(paymentMethods[0]);
    }

    if (
      (selectedPaymentMethod || {}).id !==
      (prevProps.selectedPaymentMethod || {}).id
    ) {
      handleExchangeState(() => ({
        amount: 0,
        cost: 0,
      }));
    }
  }

  handleChange = (event: SyntheticInputEvent<HTMLSelectElement>) => {
    const { onSelect, paymentMethods } = this.props;

    if (!paymentMethods) {
      return;
    }

    onSelect(
      paymentMethods.find((currency) => currency.token === event.target.value),
    );
  };

  render() {
    const {
      paymentMethods,
      selectedPaymentMethod,
      purchasingTokenSymbol,
    } = this.props;

    const selectId = 'payment-method';

    const renderOptions = (options) =>
      options.map((option) => (
        <option key={option.token} value={option.token}>
          {option.label}
        </option>
      ));

    return (
      <div className={styles.root}>
        <label className={styles.label} htmlFor={selectId}>
          <Trans>I want buy {purchasingTokenSymbol} with</Trans>
        </label>
        <markerTreeContext.Consumer>
          {({ markerCreator }) => (
            <Select
              id={selectId}
              data-marker={markerCreator('select')}
              value={selectedPaymentMethod && selectedPaymentMethod.token}
              onChange={this.handleChange}
            >
              {paymentMethods && renderOptions(paymentMethods)}
            </Select>
          )}
        </markerTreeContext.Consumer>
      </div>
    );
  }
}
