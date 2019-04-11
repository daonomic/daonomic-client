// @flow

import React from 'react';
import { Select } from '@daonomic/ui';
import { markerTreeContext } from '~/providers/marker-tree';
import styles from './styles.css';

// $FlowFixMe
import { Trans } from '@lingui/macro';

import type { PaymentServicePaymentMethod } from '~/domains/business/payment/types';

type Props = {|
  currencies: PaymentServicePaymentMethod[],
  isLoaded: boolean,
  purchasingTokenSymbol: string,
  onSelect: (nextPaymentMethod: ?PaymentServicePaymentMethod) => void,
  selectedPaymentMethod: PaymentServicePaymentMethod,
|};

export class PaymentMethodSelectView extends React.PureComponent<Props> {
  componentDidMount() {
    const { isLoaded, currencies, onSelect } = this.props;

    if (isLoaded) {
      onSelect(currencies[0]);
    }
  }
  componentDidUpdate(prevProps: Props) {
    const { onSelect, isLoaded, selectedPaymentMethod } = this.props;

    if (prevProps.isLoaded !== isLoaded && !selectedPaymentMethod) {
      onSelect(this.props.currencies[0]);
    }
  }

  handleChange = (event: SyntheticInputEvent<HTMLSelectElement>) => {
    const { onSelect, currencies } = this.props;

    onSelect(
      currencies.find((currency) => currency.token === event.target.value),
    );
  };

  render() {
    const {
      currencies,
      isLoaded,
      selectedPaymentMethod,
      purchasingTokenSymbol,
    } = this.props;

    const selectId = 'payment-method';

    if (!isLoaded) return null;

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
              value={(selectedPaymentMethod || {}).token}
              onChange={this.handleChange}
            >
              {currencies && renderOptions(currencies)}
            </Select>
          )}
        </markerTreeContext.Consumer>
      </div>
    );
  }
}
