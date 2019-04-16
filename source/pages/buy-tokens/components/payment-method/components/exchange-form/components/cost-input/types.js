// @flow

import * as PaymentTypes from '~/domains/business/payment/types';

export type CostInputProps = {
  amount: number,
  onChange: (event: SyntheticInputEvent<HTMLSelectElement>) => void,
  cost: number,
  paymentMethod: ?PaymentTypes.PaymentServicePaymentMethod,
};
