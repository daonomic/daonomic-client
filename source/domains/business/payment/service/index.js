// @flow

import { determineBonus } from './determine-bonus';
import { fetchRate } from './fetch-rate';

import type { IPaymentService } from '~/domains/business/payment/types';

export const paymentService: IPaymentService = {
  fetchRate,
  determineBonus,
};
