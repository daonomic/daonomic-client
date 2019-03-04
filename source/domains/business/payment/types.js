// @flow
import * as DataStateTypes from '~/domains/data/data-state/types';
import * as PaymentMethodTypes from '~/domains/business/payment-method/types';

export interface IPaymentStoreState {
  dataState: DataStateTypes.DataState;
  methods: PaymentMethodTypes.Data[];
  selectedMethodId: ?PaymentMethodTypes.Id;
  selectedMethodAddressQRCode: string;
}
