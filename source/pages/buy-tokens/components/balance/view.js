// @flow
import * as React from 'react';
// $FlowFixMe
import { Trans, NumberFormat } from '@lingui/macro';
import { Panel } from '@daonomic/ui';
import { getMarker } from '~/utils/get-marker';
import { walletBalanceService } from '~/domains/business/wallet-balance';
import styles from './balance.css';

import * as DataStateTypes from '~/domains/data/data-state/types';

export type Props = {|
  isKycAllowed: boolean,
  balanceDataState: DataStateTypes.DataState,
  balance: number,
  tokenSymbol: string,
|};

const marker = getMarker('balance');

export function Balance({
  balance,
  balanceDataState,
  isKycAllowed,
  tokenSymbol,
}: Props) {
  React.useEffect(() => {
    if (!isKycAllowed) {
      return;
    }

    if (balanceDataState === 'idle') {
      walletBalanceService.loadBalance();
    } else if (balanceDataState === 'loaded') {
      return walletBalanceService.observeBalance();
    }
  }, [isKycAllowed, balanceDataState]);

  return (
    <Panel data-marker={marker()} className={styles.root}>
      <h3 className={styles.title}>
        <Trans>Your wallet balance</Trans>
      </h3>

      <p className={styles.balance}>
        <span data-marker={marker('amount')()} data-raw-value={balance}>
          <NumberFormat value={balance} />
        </span>{' '}
        {tokenSymbol}
      </p>
    </Panel>
  );
}
