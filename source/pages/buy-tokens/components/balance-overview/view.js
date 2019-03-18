// @flow

import React from 'react';
// $FlowFixMe
import { Trans, NumberFormat, Plural } from '@lingui/macro';
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

const marker = getMarker('balance-overview');

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
          <Panel className={styles.root} data-marker={marker()}>
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
                    data-marker={marker('next-unlock-date')()}
                    data-raw-value={nextUnlockEvent.date}
                  >
                    <Trans>
                      Next unlock event:{' '}
                      <span className={styles.date}>
                        <Countdown
                          renderer={(countdown) => {
                            if (countdown.completed) {
                              return (
                                <span
                                  data-marker={marker('refresh-notification')()}
                                >
                                  <Trans>Refresh page to update status</Trans>
                                </span>
                              );
                            }

                            const { minutes, days, hours, seconds } = countdown;

                            const renderedUnlockEventAmount = (
                              <span className={styles.amount}>
                                <span>(</span>
                                <NumberFormat value={nextUnlockEvent.amount} />
                                <span className={styles.symbol}>
                                  {tokenSymbol}
                                </span>
                                <span>)</span>
                              </span>
                            );

                            if (days) {
                              return (
                                <span data-marker={marker('countdown-days')()}>
                                  <Trans>
                                    in{' '}
                                    <Plural
                                      value={days}
                                      one="1 day"
                                      two="# days"
                                      few="# days"
                                      many="# days"
                                      other="# days"
                                      zero="0 days"
                                    />{' '}
                                    {hours}:{minutes}:{seconds}
                                  </Trans>
                                </span>
                              );
                            }

                            return (
                              <span data-marker={marker('countdown')()}>
                                <Trans>
                                  in {hours}:{minutes}:{seconds}
                                </Trans>
                                {renderedUnlockEventAmount}
                              </span>
                            );
                          }}
                          date={new Date(nextUnlockEvent.date)}
                        />
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
                  marker={marker}
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
