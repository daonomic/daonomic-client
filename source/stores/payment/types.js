// @flow
import type { DataState } from '~/types/common';
import * as PaymentMethodTypes from '~/domains/business/payment-method/types';

export interface IPaymentStoreState {
  dataState: DataState;
  methods: PaymentMethodTypes.Data[];
  selectedMethodId: ?PaymentMethodTypes.Id;
  selectedMethodAddressQRCode: string;
}
