// @flow
import * as PaymentMethodTypes from '~/domains/business/payment-method/types';

export type Data = {|
  id: string,
  address: string,
  startDate: ?number,
  endDate: ?number,
  sold: number,
  total: number,
  address: string,
  features?: string[],
  paymentMethods: PaymentMethodTypes.Data[],
|};
