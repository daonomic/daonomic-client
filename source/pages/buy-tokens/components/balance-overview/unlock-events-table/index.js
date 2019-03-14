// @flow

import React from 'react';
import { DataTable } from '@daonomic/ui';
// $FlowFixMe
import { Trans, DateFormat, NumberFormat } from '@lingui/macro';
import { getMarker } from '~/utils/get-marker';
import * as DataStateTypes from '~/domains/data/data-state/types';
import * as WalletBalanceTypes from '~/domains/business/wallet-balance/types';
import styles from './styles.css';

export type Props = {|
  unlockEvents: WalletBalanceTypes.UnlockEvent[],
  dataState: DataStateTypes.DataState,
  locksTotal: number,
  tokenSymbol: string,
|};

const marker = getMarker('unlock-events-table');

export function UnlockEventsTable(props: Props) {
  const { unlockEvents, dataState, locksTotal, tokenSymbol } = props;

  return (
    <DataTable
      data-marker={marker()}
      placeholder={<Trans>No unlock events found</Trans>}
      errorPlaceholder={<Trans>Failed to load unlock events</Trans>}
      getRowKey={(unlockEvent: WalletBalanceTypes.UnlockEvent) =>
        unlockEvent.date
      }
      dataState={dataState}
      data={unlockEvents}
      schema={[
        {
          id: 'unlockDate',
          name: <Trans>Date</Trans>,
          render: (unlockEvent: WalletBalanceTypes.UnlockEvent) => (
            <DateFormat
              value={unlockEvent.date}
              format={{
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
              }}
            />
          ),
        },
        {
          id: 'amount',
          name: <Trans>Amount</Trans>,
          render: (unlockEvent: WalletBalanceTypes.UnlockEvent) => (
            <React.Fragment>
              <NumberFormat value={unlockEvent.amount} />
              <span className={styles.symbol}>{tokenSymbol}</span>
            </React.Fragment>
          ),
        },
        {
          id: 'percentage',
          name: <Trans>Percentage</Trans>,
          render: (unlockEvent: WalletBalanceTypes.UnlockEvent) => (
            <NumberFormat
              format={{ style: 'percent', minimumFractionDigits: 1 }}
              value={unlockEvent.amount / locksTotal}
            />
          ),
        },
      ]}
    />
  );
}
