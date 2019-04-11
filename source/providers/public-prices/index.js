// @flow

import * as React from 'react';
import { compose } from 'ramda';
import { inject, observer } from 'mobx-react';

import type { PublicPricesContextValue } from './types';
import type { TokenStore } from '~/domains/business/token/store';
import type { SalePublicPrice } from '~/domains/business/sale/types';

export const publicPricesContext: React.Context<PublicPricesContextValue> = React.createContext(
  {
    publicPrices: null,
  },
);

type Props = {|
  publicPrices: ?(SalePublicPrice[]),
  children: React.Node | ((store: PublicPricesContextValue) => React.Node),
|};

const PublicPricesProviderFunc = (props: Props) => {
  return (
    <publicPricesContext.Provider
      value={{
        publicPrices: props.publicPrices,
      }}
    >
      {props.children}
    </publicPricesContext.Provider>
  );
};

const enhance = compose(
  observer,
  inject(({ token }: { token: TokenStore }) => ({
    publicPrices: token && ((token.sale || {}).payment || {}).publicPrices,
  })),
);

export const PublicPricesProvider = enhance(PublicPricesProviderFunc);

export const withPublicPricesProvider = (
  Component: React.ComponentType<mixed>,
) => {
  return (props: mixed) => (
    <PublicPricesProvider>
      <Component {...props} />
    </PublicPricesProvider>
  );
};
