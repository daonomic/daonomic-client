// @flow
import { walletBalanceApi } from '~/domains/business/wallet-balance/api';
import { transactionsService } from '~/domains/business/transactions';
import { walletBalance } from '~/domains/business/wallet-balance';

import * as WalletBalanceTypes from '~/domains/business/wallet-balance/types';

/**
 * @todo response types  ??
 */

export async function makeWithdraw({
  locks,
}: {|
  locks: WalletBalanceTypes.Lock[],
|}): Promise<any> {
  try {
    walletBalance.setState({
      withdrawingState: 'loading',
    });

    const responses = await Promise.all(
      locks.map(async (lock) => {
        const transaction = await walletBalanceApi.createWithdrawTransaction(
          lock.address,
        );

        const txHash = await transactionsService.send({
          data: transaction.data,
          to: transaction.to,
        });

        return transactionsService.wait({
          id: transaction.id,
          txHash,
        });
      }),
    );

    walletBalance.setState({
      withdrawingState: 'loaded',
    });

    return responses;
  } catch (error) {
    walletBalance.setState({
      withdrawingState: 'failed',
    });
    throw error;
  }
}
