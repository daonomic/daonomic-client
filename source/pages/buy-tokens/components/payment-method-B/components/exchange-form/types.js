// @flow

import * as DataStateTypes from '~/domains/data/data-state/types';
import * as PaymentTypes from '~/domains/business/payment/types';

export type ExchangeFormValue = {|
  amount: number,
  cost: number,
|};

export type ExchangeFormContextValue = {|
  bonus: DataStateTypes.LoadableData<number>,
  handleSubmit: () => void,
  handleValue: (value: ExchangeFormValue) => void,
  formattedCost: number,
  amount: number,
  hasFetchError: boolean,
  kyberTermsChecked: boolean,
  isHydrating: boolean,
  isMaySubmit: boolean,
  handleKyberTermsCheckedState: (checked: boolean) => void,
  reset: () => void,
  tokenSymbol: string,
  isKyber: boolean,
  selectedPaymentMethod: ?PaymentTypes.PaymentServicePaymentMethod,
  costPrecision: number,
  cost: number,
|};

export type ExchangeFormViewProps = {|
  onSubmit: () => void,
  displayResetButton: boolean,
  handleKyberTermsCheckedState: (checked: boolean) => void,
  isKyber: boolean,
  hasFetchError: boolean,
|};
