// @flow

import * as React from 'react';
import { connectContext } from '~/HOC/connect-context';
import { inject } from 'mobx-react';
import { compose } from 'ramda';
import { availablePaymentMethodsContext } from '~/providers/available-payment-methods';

import type { RootStore } from '~/domains/app/stores';
import type { SaleStore } from '~/domains/business/sale/store';
import type { PaymentServicePaymentMethod } from '~/domains/business/payment/types';
import type { AvailablePaymentMethodsContextValue } from '~/providers/available-payment-methods/types';

type State = {|
  selectedPaymentMethod: ?PaymentServicePaymentMethod,
|};

type InjectedProps = {|
  isImmediatePurchaseAvailable: boolean,
  purchasingTokenSymbol: ?string,
  checkImmediatePurchaseAvailability: () => mixed,
  buyTokens: ({ costInEthers: number }) => mixed,
|};

export type PaymentMethodContextValue = {|
  ...State,
  ...InjectedProps,
  saleId: ?string,
  selectPaymentMethod?: (key: ?PaymentServicePaymentMethod) => void,
  selectedSymbol: ?string,
  ethRate: ?number,
  selectedMethodAddress: ?string,
  isKyber: boolean,
  sale: ?SaleStore,
|};

type Props = {|
  ...InjectedProps,
  sale: SaleStore,
  children: React.Node | ((store: PaymentMethodContextValue) => React.Node),
  currencies: PaymentServicePaymentMethod[],
  purchasingTokenSymbol: string,
|};

const initialValue: PaymentMethodContextValue = {
  selectedPaymentMethod: null,
  selectedSymbol: null,
  isKyber: false,
  isImmediatePurchaseAvailable: false,
  checkImmediatePurchaseAvailability: () => {},
  buyTokens: () => {},
  purchasingTokenSymbol: null,
  saleId: null,
  sale: null,
  selectedMethodAddress: null,
  ethRate: null,
};

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

    return selectedPaymentMethod.token;
  }

  get isKyber() {
    const { currencies } = this.props;
    const { selectedPaymentMethod } = this.state;

    if (!currencies || !selectedPaymentMethod) return false;

    return (
      currencies.map((curr) => curr.id).indexOf(selectedPaymentMethod.id) !== -1
    );
  }

  get ethRate(): number {
    const { payment } = this.props.sale;

    if (!payment.publicPrices) return 0;

    const ethMethod = payment.publicPrices.find(
      (method) => method.label === 'ETH',
    );

    if (!ethMethod) return 0;

    return ethMethod.rate;
  }

  get isImmediatePurchaseAvailable() {
    const { isImmediatePurchaseAvailable } = this.props;
    const symbol = this.selectedSymbol;

    if (!symbol) return false;

    return (
      (isImmediatePurchaseAvailable && symbol === 'ETH') || this.isERC20(symbol)
    );
  }

  get selectedMethodAddress(): ?string {
    const { selectedPaymentMethod } = this.state;

    return selectedPaymentMethod && selectedPaymentMethod.id;
  }

  isERC20 = (symbol: string): boolean => {
    const { currencies } = this.props;

    if (!currencies) return false;

    return currencies.indexOf(symbol) !== -1;
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
    const { sale } = this.props;

    return (
      <paymentMethodContext.Provider
        value={{
          selectedPaymentMethod: this.state.selectedPaymentMethod,
          selectPaymentMethod: this.selectPaymentMethod,
          saleId: sale.data && sale.data.id,
          selectedSymbol: this.selectedSymbol,
          purchasingTokenSymbol: this.props.purchasingTokenSymbol,
          ethRate: this.ethRate,
          selectedMethodAddress: this.selectedMethodAddress,
          sale: sale,
          checkImmediatePurchaseAvailability: this.props
            .checkImmediatePurchaseAvailability,
          isKyber: this.isKyber,
          isImmediatePurchaseAvailable: this.isImmediatePurchaseAvailable,
          buyTokens: this.props.buyTokens,
        }}
      >
        {this.props.children}
      </paymentMethodContext.Provider>
    );
  };
}

const mapGlobalStoreToProps = (store: RootStore): InjectedProps => {
  return {
    isImmediatePurchaseAvailable: store.immediatePurchase.isAvailable,
    checkImmediatePurchaseAvailability:
      store.immediatePurchase.checkAvailability,
    buyTokens: store.immediatePurchase.buyTokens,
    purchasingTokenSymbol: store.token.symbol,
  };
};

const enhance = compose(
  connectContext(
    availablePaymentMethodsContext,
    (context: AvailablePaymentMethodsContextValue) => ({
      currencies: context.allowedCurrencies,
      isLoaded: context.currencies.dataState === 'loaded',
    }),
  ),
  inject(mapGlobalStoreToProps),
);

export const PaymentMethodProvider = enhance(PaymentMethodProviderClass);

export const withPaymentMethodProvider = (Component: any) => {
  return (props: Props) => (
    <PaymentMethodProvider sale={props.sale}>
      <Component {...props} />
    </PaymentMethodProvider>
  );
};
