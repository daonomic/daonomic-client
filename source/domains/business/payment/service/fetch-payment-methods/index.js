// @flow

import { apiClient } from '~/domains/app/api-client';

import type { PaymentServiceFetchPaymentMethodsResponse } from '~/domains/business/payment/types';

// export const fetchPaymentMethods = async (): Promise<PaymentServiceFetchPaymentMethodsResponse> =>
//   apiClient.get('/payment/methods').then((response) => response.data);

export const fetchPaymentMethods = async (): Promise<PaymentServiceFetchPaymentMethodsResponse> => ({
  currencies: [
    {
      id: '0x4e470dc7321e84ca96fcaedd0c8abcebbaeb68c6',
      token: 'KNC',
      label: 'KyberNetwork',
      price: '2',
      rate: '0.5',
      raised: '100',
      sold: '200',
      bonus: '0',
    },
    {
      id: '0x4bfba4a8f28755cb2061c413459ee562c6b9c51b',
      token: 'OMG',
      label: 'OmiseGO',
      price: '4',
      rate: '0.25',
      raised: '100',
      sold: '200',
      bonus: '0',
    },
  ],
});
