// @flow

import * as ExchangeFormTypes from '~/pages/buy-tokens/components/payment-method-B/components/exchange-form/types';

export type AmountInputProps = {
  isHydrating: boolean,
  amount: number,
  handleValue: (value: ExchangeFormTypes.ExchangeFormValue) => void,
  cost: number,
  tokenSymbol: string,
};
