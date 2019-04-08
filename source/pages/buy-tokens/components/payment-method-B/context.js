// @flow

import * as React from 'react';

import type { SaleStore } from '~/domains/business/sale/store';

type State = {|
  selectedPaymentMethod: ?string,
|};

type PaymentMethodContextValue = {|
  ...State,
  selectPaymentMethod?: (key: string) => void,
|};

type Props = {|
  sale: SaleStore,
  children: React.Node | ((store: PaymentMethodContextValue) => React.Node),
|};

const initialValue: PaymentMethodContextValue = {
  selectedPaymentMethod: null,
};

export const paymentMethodContext: React.Context<PaymentMethodContextValue> = React.createContext(
  initialValue,
);

class PaymentMethodProvider extends React.PureComponent<Props, State> {
  state = {
    selectedPaymentMethod: null,
  };

  selectPaymentMethod = (selectedPaymentMethod: string): void => {
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
        }}
      >
        {this.props.children}
      </paymentMethodContext.Provider>
    );
  };
}

export const withPaymentMethodProvider = (Component: any) => {
  return (props: Props) => (
    <PaymentMethodProvider sale={props.sale}>
      <Component {...props} />
    </PaymentMethodProvider>
  );
};
