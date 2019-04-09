// @flow

import * as React from 'react';
import { paymentService } from '~/domains/business/payment';
import { initialValue } from './config';

import type { AvailablePaymentMethodsContextValue } from './types';
import * as DataStateTypes from '~/domains/data/data-state/types';
import * as PaymentTypes from '~/domains/business/payment/types';

type State = {|
  currencies: DataStateTypes.LoadableData<
    PaymentTypes.PaymentServicePaymentMethod[],
  >,
|};

export const availablePaymentMethodsContext: React.Context<AvailablePaymentMethodsContextValue> = React.createContext(
  initialValue,
);

type Props = {|
  children:
    | React.Node
    | ((store: AvailablePaymentMethodsContextValue) => React.Node),
|};

export class AvailablePaymentMethodsProvider extends React.PureComponent<
  Props,
  State,
> {
  state = {
    currencies: { dataState: 'idle' },
  };

  get allowedCurrencies(): ?(PaymentTypes.PaymentServicePaymentMethod[]) {
    const { currencies } = this.state;

    if (currencies.dataState === 'loaded') {
      return currencies.data;
    }

    return null;
  }

  get hasError(): boolean {
    const { dataState } = this.state.currencies;

    return dataState === 'failed';
  }

  get isLoading(): boolean {
    const { dataState } = this.state.currencies;

    return dataState === 'loading';
  }

  get isLoaded(): boolean {
    const { dataState } = this.state.currencies;

    return dataState === 'loaded';
  }

  componentDidMount() {
    const { dataState } = this.state.currencies;

    if (dataState !== 'loaded') {
      this.loadCurrencies();
    }
  }

  componentDidCatch(error: mixed) {
    // eslint-disable-next-line
    console.error(error);

    this.setState({
      currencies: { dataState: 'failed' },
    });
  }

  loadCurrencies = async () => {
    const paymentMethodsResponse = await paymentService.fetchPaymentMethods();

    if (!paymentMethodsResponse.currencies) {
      throw new Error('Cant load currencies');
    }

    this.setState({
      currencies: {
        dataState: 'loaded',
        data: paymentMethodsResponse.currencies,
      },
    });
  };

  render() {
    return (
      <availablePaymentMethodsContext.Provider
        value={{
          currencies: this.state.currencies,
          isLoading: this.isLoading,
          hasError: this.hasError,
          allowedCurrencies: this.allowedCurrencies,
          isLoaded: this.isLoaded,
        }}
      >
        {this.props.children}
      </availablePaymentMethodsContext.Provider>
    );
  }
}

export const withAvailablePaymentMethodsProvider = (
  Component: React.ComponentType<mixed>,
) => {
  return (props: mixed) => (
    <AvailablePaymentMethodsProvider>
      <Component {...props} />
    </AvailablePaymentMethodsProvider>
  );
};
