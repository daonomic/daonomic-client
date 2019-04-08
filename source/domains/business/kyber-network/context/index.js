// @flow

import * as React from 'react';
import { kyberNetworkService } from '~/domains/business/kyber-network';
import * as DataStateTypes from '~/domains/data/data-state/types';
import * as KyberNetworkTypes from '~/domains/business/kyber-network/types';

const initialValue = {
  currencies: {
    dataState: 'loading',
  },
  loadedSellRates: {},
  getSellRateToEth: async () => 1,
};

type State = {|
  currencies: DataStateTypes.LoadableData<
    KyberNetworkTypes.KyberNetworkCurrency[],
  >,
  loadedSellRates: {
    [key: string]: number,
  },
|};

type KyberNetworkContextValue = {
  ...State,
};

export const kyberNetworkContext: React.Context<KyberNetworkContextValue> = React.createContext(
  initialValue,
);

type Props = {|
  children: React.Node | ((store: KyberNetworkContextValue) => React.Node),
|};

export class KyberNetworkProvider extends React.PureComponent<Props, State> {
  state = {
    currencies: { dataState: 'idle' },
    loadedSellRates: {},
  };

  componentDidMount() {
    const { dataState } = this.state.currencies;

    if (dataState !== 'loaded') {
      this.loadCurrencies();
    }
  }

  loadCurrencies = async () => {
    const currencies = await kyberNetworkService.getAvailableCurrencies();

    this.setState({
      currencies: {
        dataState: 'loaded',
        data: currencies,
      },
    });
  };

  getSellRateToEth = async (tokenAddress: string) => {
    const { loadedSellRates } = this.state;

    if (loadedSellRates[tokenAddress]) {
      return loadedSellRates[tokenAddress];
    }

    const rate = await kyberNetworkService.getSellRate({
      id: tokenAddress,
      qty: 1,
    });

    this.setState((state) => ({
      loadedSellRates: {
        ...state.loadedSellRates,
        [tokenAddress]: rate,
      },
    }));

    return rate;
  };

  render() {
    return (
      <kyberNetworkContext.Provider
        value={{
          currencies: this.state.currencies,
          loadedSellRates: this.state.loadedSellRates,
          getSellRateToEth: this.getSellRateToEth,
        }}
      >
        {this.props.children}
      </kyberNetworkContext.Provider>
    );
  }
}

export const withKyberNetworkProvider = (Component: any) => {
  return (props: {}) => (
    <KyberNetworkProvider>
      <Component {...props} />
    </KyberNetworkProvider>
  );
};
