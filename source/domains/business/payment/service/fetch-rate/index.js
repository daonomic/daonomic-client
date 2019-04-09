// @flow
import { apiClient } from '~/domains/app/api-client';

import type { PaymentServiceFetchRateType } from '~/domains/business/payment/types';

export type PaymentServiceFetchRateData = {|
  amount: number,
  from: string,
  to: string,
|};

// @todo remove mock

// export const fetchRate = (
//   data: PaymentServiceFetchRateData,
// ): Promise<PaymentServiceFetchRateType> =>
//   apiClient.post(`/payment/rate`, data).then((response) => response.data);

export const fetchRate = async (
  // eslint-disable-next-line
  data: PaymentServiceFetchRateData,
): Promise<PaymentServiceFetchRateType> => ({
  rate: 1.5,
});
