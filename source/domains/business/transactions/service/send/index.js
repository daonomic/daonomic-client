// @flow
import { web3Service } from '~/domains/business/web3/service';

import * as AddressTypes from '~/domains/business/address/types';
import * as TransactionsTypes from '~/domains/business/transactions/types';

export async function send(transaction: {|
  data: string,
  to: AddressTypes.Address,
|}): Promise<TransactionsTypes.TransactionHash> {
  if (!web3Service) return Promise.reject(new Error('No web3Service'));

  return web3Service.sendTransaction({
    to: transaction.to,
    data: transaction.data,
  });
}
