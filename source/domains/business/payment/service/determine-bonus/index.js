// @flow
import { apiClient } from '~/domains/app/api-client';

export type PaymentServiceDetermineBonusData = {|
  amount: number,
  saleId: string,
|};

export const determineBonus = (
  data: PaymentServiceDetermineBonusData,
): Promise<number> =>
  apiClient
    .post(`/sales/${data.saleId}/bonus`, { amount: data.amount })
    .then((response) => response.data);
