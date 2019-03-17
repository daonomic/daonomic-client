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
  tokenSymbol: string,
  transactionsState: DataStateTypes.DataState,
  transactions: TransactionsTypes.Transaction[],
|};

const marker = getMarker('transactions');

export function Transactions({
  tokenSymbol,
  transactionsState,
  transactions,
}: Props) {
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
          transaction.id
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
            id: 'transactionInfo',
            name: <Trans>Transaction info</Trans>,
            render: (transaction: TransactionsTypes.Transaction) => {
              switch (transaction.type) {
                case 'PURCHASE': {
                  return (
                    <React.Fragment>
                      <div>
                        <Trans>
                          Purchased <NumberFormat value={transaction.sold} />{' '}
                          {tokenSymbol} for{' '}
                          <NumberFormat value={transaction.value} />{' '}
                          {transaction.paymentMethodType}
                        </Trans>
                      </div>

                      {transaction.bonus > 0 ? (
                        <div>
                          <Trans>
                            Bonus: <NumberFormat value={transaction.bonus} />
                          </Trans>
                        </div>
                      ) : null}
                    </React.Fragment>
                  );
                }

                case 'CREATE_HOLDER': {
                  if (transaction.creates) {
                    return (
                      <Trans>
                        Received{' '}
                        <NumberFormat value={transaction.form.amount} /> locked{' '}
                        {tokenSymbol}
                      </Trans>
                    );
                  }

                  return (
                    <Trans>
                      Received <NumberFormat value={transaction.form.amount} />{' '}
                      {tokenSymbol}
                    </Trans>
                  );
                }

                case 'RELEASE': {
                  return (
                    <Trans>
                      Withdrawed <NumberFormat value={transaction.amount} />{' '}
                      {tokenSymbol}
                    </Trans>
                  );
                }

                default: {
                  (transaction.type: empty);
                  return null;
                }
              }
            },
          },
          {
            id: 'etherscan',
            align: 'right',
            render: (transaction: TransactionsTypes.Transaction) => {
              if (!transaction.hash) {
                return null;
              }

              return (
                <EtherscanLink
                  href={etherscan.getTransactionUrl(transaction.hash)}
                />
              );
            },
          },
        ]}
      />
    </Panel>
  );
}
