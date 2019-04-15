// @flow
import * as PaymentTypes from '~/domains/business/payment/types';

export type Data = {|
  id: string,
  address: string,
  startDate: ?number,
  endDate: ?number,
  sold: number,
  total: number,
  address: string,
  paymentMethods: PaymentTypes.PaymentServicePaymentMethod[],
|};
