// @flow
import type { DataState } from '~/types/common';
import type { PaymentMethod } from '~/types/payment';

export interface IPaymentStoreState {
  dataState: DataState;
  methods: PaymentMethod[];
  selectedMethodId: ?string;
  selectedMethodAddressQRCode: string;
}
