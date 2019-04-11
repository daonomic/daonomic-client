// @flow

import * as React from 'react';
import { compose } from 'ramda';
import { inject, observer } from 'mobx-react';

import type { ContractProxiesContextValue } from './types';
import type { TokenStore } from '~/domains/business/token/store';
import type { ContractProxies } from '~/domains/business/token/types';

export const contractProxiesContext: React.Context<ContractProxiesContextValue> = React.createContext(
  {
    contractProxies: null,
  },
);

type Props = {|
  contractProxies: ContractProxies,
  children: React.Node | ((store: ContractProxiesContextValue) => React.Node),
|};

const ContractProxiesProviderFunc = (props: Props) => {
  return (
    <contractProxiesContext.Provider
      value={{
        contractProxies: props.contractProxies,
      }}
    >
      {props.children}
    </contractProxiesContext.Provider>
  );
};

const enhance = compose(
  inject(({ token }: { token: TokenStore }) => ({
    contractProxies: token && token.contracts,
  })),
  observer,
);

export const ContractProxiesProvider = enhance(ContractProxiesProviderFunc);

export const withContractProxiesProvider = (
  Component: React.ComponentType<mixed>,
) => {
  return (props: mixed) => (
    <ContractProxiesProvider>
      <Component {...props} />
    </ContractProxiesProvider>
  );
};
