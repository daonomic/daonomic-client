//@flow
import * as React from 'react';
// $FlowFixMe
import { Trans, NumberFormat, DateFormat } from '@lingui/macro';
import { Panel, DataTable } from '@daonomic/ui';
import { getMarker } from '~/utils/get-marker';
import { Heading } from '~/components/heading';
import { Address } from '~/components/address';
import { walletBalanceService } from '~/domains/business/wallet-balance';
import style from './style.css';

import * as DataStateTypes from '~/domains/data/data-state/types';
import * as WalletBalanceTypes from '~/domains/business/wallet-balance/types';

export type Props = {|
  locksDataState: DataStateTypes.DataState,
  locksData: WalletBalanceTypes.Lock[],
|};

const marker = getMarker('locks-balance');

export function LocksBalance({ locksDataState, locksData }: Props) {
  React.useEffect(() => {
    if (locksDataState === 'idle') {
      walletBalanceService.loadBalance();
    } else if (locksDataState === 'loaded') {
      return walletBalanceService.observeBalance();
    }
  }, [locksDataState]);

  if (locksData.length === 0) {
    return null;
  }

  return (
    <Panel data-marker={marker()}>
      <Heading className={style.title} tagName="h2" size="normal">
        <Trans>Locks balance</Trans>
      </Heading>

      <DataTable
        data-marker={marker('table')()}
        placeholder={<Trans>No locks found</Trans>}
        errorPlaceholder={<Trans>Failed to load locks</Trans>}
        getRowKey={(lock: WalletBalanceTypes.Lock) => lock.address}
        dataState={locksDataState}
        data={locksData}
        schema={[
          {
            id: 'address',
            name: <Trans>Address</Trans>,
            render: (lock: WalletBalanceTypes.Lock) => (
              <Address address={lock.address} />
            ),
          },
          {
            id: 'totalAmount',
            name: <Trans>Total amount</Trans>,
            render: (lock: WalletBalanceTypes.Lock) => (
              <NumberFormat value={lock.balance.total} />
            ),
          },
          {
            id: 'available',
            name: <Trans>Available</Trans>,
            render: (lock: WalletBalanceTypes.Lock) => (
              <NumberFormat
                value={lock.balance.vested - lock.balance.released}
              />
            ),
          },
          {
            id: 'nextUnlock',
            name: <Trans>Next unlock</Trans>,
            render: (lock: WalletBalanceTypes.Lock) =>
              lock.nextUnlockEvent ? (
                <Trans>
                  <NumberFormat value={lock.nextUnlockEvent.amount} /> on{' '}
                  <DateFormat
                    value={lock.nextUnlockEvent.date}
                    format={{
                      year: 'numeric',
                      month: 'numeric',
                      day: 'numeric',
                    }}
                  />
                </Trans>
              ) : (
                '—'
              ),
          },
        ]}
      />
    </Panel>
  );
}
