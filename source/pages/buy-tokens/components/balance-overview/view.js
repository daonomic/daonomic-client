// @flow

import React from 'react';
// $FlowFixMe
import { Trans, NumberFormat } from '@lingui/macro';
import Countdown from 'react-countdown-now';
import { WalletBalanceProvider } from '~/providers/wallet-balance-provider';
import { Panel } from '@daonomic/ui';
import { WithdrawButton } from './withdraw-button';
import { getMarker } from '~/utils/get-marker';
import { UnlockEventsTable } from './unlock-events-table';
import { Title } from './title';
import styles from './styles.css';

export type Props = {|
  tokenSymbol: string,
  onWithdraw: () => mixed,
|};

const marker = getMarker('balance');

export function BalanceOverview({ tokenSymbol, onWithdraw }: Props) {
  return (
    <WalletBalanceProvider>
      {({
        state,
        nextUnlockEvent,
        locksTotal,
        unlockEvents,
        locksAvailable,
      }) => {
        return (
          <Panel className={styles.root} data-maker={marker()}>
            <Title>
              <Trans>Balance Statistics</Trans>
            </Title>
            <ul className={styles.items}>
              <li className={styles.item}>
                <span
                  data-marker={marker('total-received')()}
                  data-raw-value={state.totalReceived}
                >
                  <Trans>
                    Total received:{' '}
                    <span className={styles.number}>
                      <NumberFormat value={state.totalReceived} />
                    </span>
                  </Trans>
                </span>
                <span className={styles.symbol}>{tokenSymbol}</span>
              </li>
              <li className={styles.item}>
                <span
                  data-marker={marker('available')()}
                  data-raw-value={locksAvailable}
                >
                  <Trans>
                    Available:{' '}
                    <span className={styles.number}>
                      <NumberFormat value={locksAvailable} />
                    </span>
                  </Trans>
                </span>
                <span className={styles.symbol}>{tokenSymbol}</span>
                <div className={styles.withdrawButton}>
                  <WithdrawButton
                    data-marker={marker('withdraw-button')()}
                    onClick={onWithdraw}
                    withdrawingState={state.withdrawingState}
                  />
                </div>
              </li>
              {nextUnlockEvent && (
                <li className={styles.item}>
                  <span
                    data-marker={marker('next-unlock-event')()}
                    data-raw-value={state.balance}
                  >
                    <Trans>
                      Next unlock event:{' '}
                      <span className={styles.date}>
                        <Countdown
                          renderer={(countdown) => {
                            if (countdown.completed) {
                              return (
                                <Trans>Refresh page to update status</Trans>
                              );
                            }

                            const { minutes, days, hours, seconds } = countdown;

                            if (days) {
                              return (
                                <Trans>
                                  {`in ${days} days ${hours}:${minutes}:${seconds}`}
                                </Trans>
                              );
                            }

                            return (
                              <Trans>{`in ${hours}:${minutes}:${seconds}`}</Trans>
                            );
                          }}
                          date={new Date(nextUnlockEvent.date)}
                        />
                        <span className={styles.amount}>
                          <span>(</span>
                          <NumberFormat value={nextUnlockEvent.amount} />
                          <span className={styles.symbol}>{tokenSymbol}</span>
                          <span>)</span>
                        </span>
                      </span>
                    </Trans>
                  </span>
                </li>
              )}
            </ul>

            {unlockEvents.length > 0 && (
              <div className={styles.unlockEvents}>
                <Panel.Separator />
                <Title>
                  <Trans>Unlock schedule</Trans>
                </Title>
                <UnlockEventsTable
                  tokenSymbol={tokenSymbol}
                  dataState={state.dataState}
                  unlockEvents={unlockEvents}
                  locksTotal={locksTotal}
                />
              </div>
            )}
          </Panel>
        );
      }}
    </WalletBalanceProvider>
  );
}
