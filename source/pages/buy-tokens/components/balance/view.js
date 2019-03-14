// @flow
import * as React from 'react';
// $FlowFixMe
import { Trans, NumberFormat } from '@lingui/macro';
import { Panel } from '@daonomic/ui';
import { getMarker } from '~/utils/get-marker';
import { WalletBalanceProvider } from '~/providers/wallet-balance-provider';
import styles from './balance.css';

export type Props = {|
  tokenSymbol: string,
|};

const marker = getMarker('balance');

export function Balance(props: Props) {
  const { tokenSymbol } = props;

  return (
    <Panel data-marker={marker()} className={styles.root}>
      <h3 className={styles.title}>
        <Trans>Your balance</Trans>
      </h3>
      <WalletBalanceProvider>
        {({ lockedBalance, state }) => {
          if (!lockedBalance) {
            return (
              <p className={styles.balance}>
                <span
                  data-marker={marker('amount')()}
                  data-raw-value={state.balance}
                >
                  <NumberFormat value={state.balance} />
                </span>
                <span className={styles.symbol}>{tokenSymbol}</span>
              </p>
            );
          }
          return (
            <React.Fragment>
              <div className={styles.zone}>
                <h4 className={styles.subtitle}>In wallet</h4>

                <p className={styles.balance}>
                  <span
                    data-marker={marker('amount')()}
                    data-raw-value={state.balance}
                  >
                    <NumberFormat value={state.balance} />
                  </span>
                  <span className={styles.symbol}>{tokenSymbol}</span>
                </p>
              </div>
              <div className={styles.zone}>
                <h4 className={styles.subtitle}>Locked</h4>

                <p className={styles.balance}>
                  <span
                    data-marker={marker('locked')()}
                    data-raw-value={lockedBalance}
                  >
                    <NumberFormat value={lockedBalance} />
                  </span>
                  <span className={styles.symbol}>{tokenSymbol}</span>
                </p>
              </div>
            </React.Fragment>
          );
        }}
      </WalletBalanceProvider>
    </Panel>
  );
}
