// @flow

import * as React from 'react';
import { connectContext } from '~/HOC/connect-context';
import { inject } from 'mobx-react';
import { compose } from 'ramda';
import { availablePaymentMethodsContext } from '~/providers/available-payment-methods';
import { publicPricesContext } from '~/providers/public-prices';
import { initialValue } from './config';

import type { RootStore } from '~/domains/app/stores';
import type { PaymentMethodContextValue } from './types';
import type { PaymentServicePaymentMethod } from '~/domains/business/payment/types';
import type { AvailablePaymentMethodsContextValue } from '~/providers/available-payment-methods/types';
import type { SalePublicPrice } from '~/domains/business/sale/types';

type State = {|
  selectedPaymentMethod: ?PaymentServicePaymentMethod,
|};

type Props = {|
  purchasingTokenSymbol: ?string,
  publicPrices: ?(SalePublicPrice[]),
  children: React.Node | ((store: PaymentMethodContextValue) => React.Node),
  currencies: PaymentServicePaymentMethod[],
  purchasingTokenSymbol: string,
|};

export const paymentMethodContext: React.Context<PaymentMethodContextValue> = React.createContext(
  initialValue,
);

class PaymentMethodProviderClass extends React.PureComponent<Props, State> {
  state = {
    selectedPaymentMethod: null,
  };

  get selectedSymbol() {
    const { selectedPaymentMethod } = this.state;

    if (!selectedPaymentMethod) return null;

    return selectedPaymentMethod.id;
  }

  get selectedMethodAddress(): ?string {
    const { selectedPaymentMethod } = this.state;

    return selectedPaymentMethod && selectedPaymentMethod.token;
  }

  getPublicPrice = (symbol: string): ?number => {
    const { publicPrices } = this.props;

    if (!publicPrices) return null;

    const method = publicPrices.find((method) => method.label === symbol);

    if (!method) return 0;

    return method.rate;
  };

  selectPaymentMethod = (
    selectedPaymentMethod: ?PaymentServicePaymentMethod,
  ): void => {
    if (!selectedPaymentMethod) return;
    this.setState({
      selectedPaymentMethod,
    });
  };

  render = () => {
    return (
      <paymentMethodContext.Provider
        value={{
          selectedPaymentMethod: this.state.selectedPaymentMethod,
          selectPaymentMethod: this.selectPaymentMethod,
          selectedSymbol: this.selectedSymbol,
          purchasingTokenSymbol: this.props.purchasingTokenSymbol,
          getPublicPrice: this.getPublicPrice,
          selectedMethodAddress: this.selectedMethodAddress,
        }}
      >
        {this.props.children}
      </paymentMethodContext.Provider>
    );
  };
}

type InjectedProps = {|
  purchasingTokenSymbol: ?string,
|};

const mapGlobalStoreToProps = (store: RootStore): InjectedProps => ({
  purchasingTokenSymbol: store.token.symbol,
});

const enhance = compose(
  connectContext(
    availablePaymentMethodsContext,
    (context: AvailablePaymentMethodsContextValue) => ({
      currencies: context.paymentMethods,
      isLoaded: !!context.paymentMethods,
    }),
  ),
  connectContext(publicPricesContext, (context) => ({
    publicPrices: context.publicPrices,
  })),
  inject(mapGlobalStoreToProps),
);

export const PaymentMethodProvider = enhance(PaymentMethodProviderClass);

export const withPaymentMethodProvider = (Component: any) => {
  return (props: Props) => (
    <PaymentMethodProvider>
      <Component {...props} />
    </PaymentMethodProvider>
  );
};
