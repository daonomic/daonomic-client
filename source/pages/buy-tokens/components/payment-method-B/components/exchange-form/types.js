// @flow

import * as PaymentTypes from '~/domains/business/payment/types';

export type ExchangeFormValue = {|
  amount: number,
  cost: number,
|};

export type PurchaseTransactionData = {|
  cost: number,
  amount: number,
  paymentMethod: PaymentTypes.PaymentServicePaymentMethod,
|};

export type ExchangeFormContextValue = {|
  handleSubmit: () => Promise<void>,
  handleValue: (value: ExchangeFormValue) => void,
  formattedCost: number,
  lastTransaction: ?PurchaseTransactionData,
  amount: number,
  hasFetchError: boolean,
  kyberTermsChecked: boolean,
  isHydrating: boolean,
  purchasingTokenSymbol: string,
  isMaySubmit: boolean,
  handleKyberTermsCheckedState: (checked: boolean) => void,
  reset: (lastTransaction: ?PurchaseTransactionData) => void,
  tokenSymbol: string,
  isKyber: boolean,
  selectedPaymentMethod: ?PaymentTypes.PaymentServicePaymentMethod,
  costPrecision: number,
  cost: number,
|};

export type ExchangeFormViewProps = {|
  onSubmit: () => Promise<void>,
  displayResetButton: boolean,
  handleKyberTermsCheckedState: (checked: boolean) => void,
  isKyber: boolean,
  hasLastTransaction: boolean,
  hasFetchError: boolean,
|};
