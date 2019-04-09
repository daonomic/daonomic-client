// @flow

import * as DataStateTypes from '~/domains/data/data-state/types';
import * as ExchangeFormTypes from '~/pages/buy-tokens/components/payment-method-B/components/exchange-form/types';

export type AmountInputProps = {
  isHydrating: boolean,
  bonus: DataStateTypes.LoadableData<number>,
  amount: number,
  handleValue: (value: ExchangeFormTypes.ExchangeFormValue) => void,
  cost: number,
  tokenSymbol: string,
};
