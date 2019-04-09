// @flow

import React from 'react';
import { Select } from '@daonomic/ui';
import { markerTreeContext } from '~/providers/marker-tree';
import styles from './styles.css';

// $FlowFixMe
import { Trans } from '@lingui/macro';

import * as KyberNetworkTypes from '~/domains/business/kyber-network/types';

type Props = {|
  currencies: KyberNetworkTypes.KyberNetworkCurrency[],
  isLoaded: boolean,
  onSelect: (
    nextPaymentMethod: ?KyberNetworkTypes.KyberNetworkCurrency,
  ) => void,
  selectedPaymentMethod: KyberNetworkTypes.KyberNetworkCurrency,
|};

export class PaymentMethodSelectView extends React.PureComponent<Props> {
  componentDidUpdate(prevProps: Props) {
    const { onSelect, currencies, selectedPaymentMethod } = this.props;

    if (!prevProps.currencies && !selectedPaymentMethod && currencies) {
      onSelect(currencies[0]);
    }
  }

  render() {
    const {
      currencies,
      isLoaded,
      onSelect,
      selectedPaymentMethod,
    } = this.props;

    const selectId = 'payment-method';

    if (!isLoaded) return null;

    const renderOptions = (options) =>
      options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.symbol}
        </option>
      ));

    return (
      <div className={styles.root}>
        <label className={styles.label} htmlFor={selectId}>
          <Trans>I want to pay with</Trans>
        </label>
        <markerTreeContext.Consumer>
          {({ markerCreator }) => (
            <Select
              id={selectId}
              data-marker={markerCreator('select')}
              value={(selectedPaymentMethod || {}).id}
              onChange={(event: SyntheticInputEvent<HTMLSelectElement>) => {
                onSelect(
                  currencies.find(
                    (currency) => currency.id === event.target.value,
                  ),
                );
              }}
            >
              {currencies && renderOptions(currencies)}
            </Select>
          )}
        </markerTreeContext.Consumer>
      </div>
    );
  }
}
