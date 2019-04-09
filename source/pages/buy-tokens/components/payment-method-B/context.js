// @flow

import * as React from 'react';
import { connectContext } from '~/HOC/connect-context';
import { inject } from 'mobx-react';
import { compose } from 'ramda';
import { kyberNetworkContext } from '~/domains/business/kyber-network/context';

import type { RootStore } from '~/domains/app/stores';
import type { SaleStore } from '~/domains/business/sale/store';
import * as KyberNetworkTypes from '~/domains/business/kyber-network/types';

type State = {|
  selectedPaymentMethod: ?KyberNetworkTypes.KyberNetworkCurrency,
|};

type ImmediatePurchaseInjectedProps = {|
  isImmediatePurchaseAvailable: boolean,
  checkImmediatePurchaseAvailability: () => mixed,
  buyTokens: ({ costInEthers: number }) => mixed,
|};

type PaymentMethodContextValue = {|
  ...State,
  ...ImmediatePurchaseInjectedProps,
  saleId: ?string,
  selectPaymentMethod?: (key: ?KyberNetworkTypes.KyberNetworkCurrency) => void,
  selectedSymbol: ?string,
  ethRate: ?number,
  sale: ?SaleStore,
|};

type Props = {|
  ...ImmediatePurchaseInjectedProps,
  sale: SaleStore,
  children: React.Node | ((store: PaymentMethodContextValue) => React.Node),
  currencies: KyberNetworkTypes.KyberNetworkCurrency[],
|};

const initialValue: PaymentMethodContextValue = {
  selectedPaymentMethod: null,
  selectedSymbol: null,
  isImmediatePurchaseAvailable: false,
  checkImmediatePurchaseAvailability: () => {},
  buyTokens: () => {},
  saleId: null,
  sale: null,
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

    return selectedPaymentMethod.symbol;
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

  isERC20 = (symbol: string): boolean => {
    const { currencies } = this.props;

    if (!currencies) return false;

    return currencies.indexOf(symbol) !== -1;
  };

  get isImmediatePurchaseAvailable() {
    const { isImmediatePurchaseAvailable } = this.props;
    const symbol = this.selectedSymbol;

    if (!symbol) return false;

    return (
      (isImmediatePurchaseAvailable && symbol === 'ETH') || this.isERC20(symbol)
    );
  }

  selectPaymentMethod = (
    selectedPaymentMethod: ?KyberNetworkTypes.KyberNetworkCurrency,
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
          ethRate: this.ethRate,
          sale: sale,
          checkImmediatePurchaseAvailability: this.props
            .checkImmediatePurchaseAvailability,
          isImmediatePurchaseAvailable: this.isImmediatePurchaseAvailable,
          buyTokens: this.props.buyTokens,
        }}
      >
        {this.props.children}
      </paymentMethodContext.Provider>
    );
  };
}

const mapGlobalStoreToProps = (
  store: RootStore,
): ImmediatePurchaseInjectedProps => {
  return {
    isImmediatePurchaseAvailable: store.immediatePurchase.isAvailable,
    checkImmediatePurchaseAvailability:
      store.immediatePurchase.checkAvailability,
    buyTokens: store.immediatePurchase.buyTokens,
  };
};

const enhance = compose(
  connectContext(kyberNetworkContext, (context) => ({
    currencies: context.currencies.data,
    isLoaded: context.currencies.dataState === 'loaded',
  })),
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
