// @flow

import * as React from 'react';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';
import { walletBalanceService } from '~/domains/business/wallet-balance';

import type { WalletBalanceStore } from '~/domains/business/wallet-balance/store';
import * as RootStoreTypes from '~/domains/app/stores';

type Renderer = (walletBalance: WalletBalanceStore) => React.Node;

type Props = {
  isKycAllowed: boolean,
  children: Renderer,
  walletBalance: WalletBalanceStore,
};

type ExternalProps = {|
  children: Renderer,
|};

function WalletBalanceProviderView(props: Props) {
  const { isKycAllowed, children, walletBalance } = props;

  React.useEffect(() => {
    if (!isKycAllowed) return;

    if (walletBalance.state.dataState === 'idle') {
      walletBalanceService.loadBalance();
    } else if (walletBalance.state.dataState === 'loaded') {
      return walletBalanceService.observeBalance();
    }
  }, [isKycAllowed, walletBalance.state.dataState]);

  return children(walletBalance);
}

export const WalletBalanceProvider: React.ComponentType<ExternalProps> = inject(
  ({
    walletBalance,
    kyc,
  }: RootStoreTypes.RootStore): $Diff<Props, ExternalProps> => ({
    isKycAllowed: kyc.isAllowed,
    walletBalance,
  }),
)(observer(WalletBalanceProviderView));
