// @flow

import * as React from 'react';
import { compose } from 'ramda';
import { inject, observer } from 'mobx-react';

import type { AvailablePaymentMethodsContextValue } from './types';
import type { TokenStore } from '~/domains/business/token/store';
import type { PaymentServicePaymentMethod } from '~/domains/business/payment/types';

export const availablePaymentMethodsContext: React.Context<AvailablePaymentMethodsContextValue> = React.createContext(
  {
    paymentMethods: null,
    defaultPaymentMethod: null,
  },
);

type Props = {|
  paymentMethods: ?(PaymentServicePaymentMethod[]),
  ethPaymentMethod: ?PaymentServicePaymentMethod,
  children:
    | React.Node
    | ((store: AvailablePaymentMethodsContextValue) => React.Node),
|};

class AvailablePaymentMethodsProviderFunc extends React.PureComponent<Props> {
  get ethPaymentMethod(): ?PaymentServicePaymentMethod {
    const { paymentMethods } = this.props;

    return (
      paymentMethods && paymentMethods.find((method) => method.id === 'ETH')
    );
  }

  render() {
    const { paymentMethods, children } = this.props;

    return (
      <availablePaymentMethodsContext.Provider
        value={{
          paymentMethods: paymentMethods,
          ethPaymentMethod: this.ethPaymentMethod,
          defaultPaymentMethod:
            paymentMethods && paymentMethods.find((method) => method.default),
        }}
      >
        {children}
      </availablePaymentMethodsContext.Provider>
    );
  }
}

const enhance = compose(
  observer,
  inject(({ token }: { token: TokenStore }) => ({
    paymentMethods: token && ((token.sale || {}).data || {}).paymentMethods,
  })),
);

export const AvailablePaymentMethodsProvider = enhance(
  AvailablePaymentMethodsProviderFunc,
);

export const withAvailablePaymentMethodsProvider = (
  Component: React.ComponentType<mixed>,
) => {
  return (props: mixed) => (
    <AvailablePaymentMethodsProvider>
      <Component {...props} />
    </AvailablePaymentMethodsProvider>
  );
};
