// @flow
import { client } from '~/domains/app/api/client';
import { config } from '~/domains/app/config';

export function determineBonus({
  amount,
}: {|
  amount: number,
|}): Promise<number> {
  return client
    .post(`/sales/${config.saleId}/bonus`, { amount })
    .then((response) => response.data);
}
