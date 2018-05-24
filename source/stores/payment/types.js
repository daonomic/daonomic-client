// @flow
import type { DataState } from '~/types/common';
import type { PaymentMethodId, PaymentMethod } from '~/types/payment';

export interface IPaymentStoreState {
  dataState: DataState;
  methods: PaymentMethod[];
  selectedMethodId: ?PaymentMethodId;
  selectedMethodAddressQRCode: string;
}
