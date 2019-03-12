//@flow
import * as React from 'react';
// $FlowFixMe
import { Trans, DateFormat, NumberFormat } from '@lingui/macro';
import { Panel, DataTable } from '@daonomic/ui';
import { EtherscanLink } from '~/components/etherscan-link';
import { Heading } from '~/components/heading';
import { getMarker } from '~/utils/get-marker';
import { etherscan } from '~/domains/business/etherscan';
import { transactionsService } from '~/domains/business/transactions';
import styles from './style.css';

import * as DataStateTypes from '~/domains/data/data-state/types';
import * as TransactionsTypes from '~/domains/business/transactions/types';

export type Props = {|
  transactionsState: DataStateTypes.DataState,
  transactions: TransactionsTypes.Transaction[],
|};

const marker = getMarker('transactions');

export function Transactions({ transactionsState, transactions }: Props) {
  React.useEffect(() => {
    if (transactionsState === 'idle') {
      transactionsService.loadTransactions();
    } else if (transactionsState === 'loaded') {
      return transactionsService.observeTransactions();
    }
  }, [transactionsState]);

  return (
    <Panel data-marker={marker()}>
      <Heading className={styles.title} tagName="h2" size="normal">
        <Trans>Transactions</Trans>
      </Heading>

      <DataTable
        data-marker={marker('table')()}
        getRowKey={(transaction: TransactionsTypes.Transaction) =>
          transaction.hash
        }
        placeholder={<Trans>No transactions found</Trans>}
        errorPlaceholder={<Trans>Failed to load transactions</Trans>}
        dataState={transactionsState}
        data={transactions}
        schema={[
          {
            id: 'date',
            name: <Trans>Date</Trans>,
            render: (transaction: TransactionsTypes.Transaction) => (
              <DateFormat
                value={transaction.createDate}
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
            id: 'status',
            name: <Trans>Status</Trans>,
            render: (transaction: TransactionsTypes.Transaction) =>
              transaction.status,
          },
          {
            id: 'type',
            name: <Trans>Type</Trans>,
            render: (transaction: TransactionsTypes.Transaction) =>
              transaction.type,
          },
          {
            id: 'amount',
            name: <Trans>Amount</Trans>,
            render: (transaction: TransactionsTypes.Transaction) => (
              <NumberFormat
                value={
                  transaction.type === 'PURCHASE'
                    ? transaction.sold
                    : transaction.form.amount
                }
              />
            ),
          },
          {
            id: 'etherscan',
            render: (transaction: TransactionsTypes.Transaction) => (
              <EtherscanLink
                href={etherscan.getTransactionUrl(transaction.hash)}
              />
            ),
          },
        ]}
      />
    </Panel>
  );
}
