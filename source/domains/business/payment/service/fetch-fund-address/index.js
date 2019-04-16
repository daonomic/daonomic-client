// @flow
import { apiClient } from '~/domains/app/api-client';

import * as PaymentTypes from '~/domains/business/payment/types';

export const fetchFundAddress = ({
  saleId,
  paymentAddress,
}: {|
  saleId: string,
  paymentAddress: string,
|}): Promise<PaymentTypes.PaymentServiceFetchFundAddress> =>
  apiClient
    .get(`/sales/${saleId}/payment/${paymentAddress}/address`)
    .then((response) => response.data);
