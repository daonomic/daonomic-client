// @flow

import * as PaymentTypes from '~/domains/business/payment/types';

export type AvailablePaymentMethodsContextValue = {
  paymentMethods: ?(PaymentTypes.PaymentServicePaymentMethod[]),
  defaultPaymentMethod: ?PaymentTypes.PaymentServicePaymentMethod,
};
