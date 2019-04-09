// @flow

import * as DataStateTypes from '~/domains/data/data-state/types';
import * as PaymentTypes from '~/domains/business/payment/types';

export type AvailablePaymentMethodsContextValue = {
  currencies: DataStateTypes.LoadableData<
    PaymentTypes.PaymentServicePaymentMethod[],
  >,
  allowedCurrencies: ?(PaymentTypes.PaymentServicePaymentMethod[]),
  isLoaded: boolean,
  isLoading: boolean,
  hasError: boolean,
};
