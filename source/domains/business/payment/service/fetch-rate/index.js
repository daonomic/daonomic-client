// @flow
import { apiClient } from '~/domains/app/api-client';

import * as PaymentTypes from '~/domains/business/payment/types';

export const fetchRate = (
  data: PaymentTypes.PaymentServiceFetchRateData,
  saleId: string,
): Promise<PaymentTypes.PaymentServiceFetchRateType> =>
  apiClient
    .post(`/sales/${saleId}/kyberRate`, data)
    .then((response) => response.data);
