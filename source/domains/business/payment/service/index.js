// @flow

import { determineBonus } from './determine-bonus';
import { fetchRate } from './fetch-rate';
import { fetchPaymentMethods } from './fetch-payment-methods';

import type { IPaymentService } from '~/domains/business/payment/types';

export const paymentService: IPaymentService = {
  fetchRate,
  fetchPaymentMethods,
  determineBonus,
};
