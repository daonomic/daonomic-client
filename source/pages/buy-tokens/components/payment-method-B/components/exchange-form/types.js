// @flow

import * as DataStateTypes from '~/domains/data/data-state/types';

export type ExchangeFormValue = {|
  amount: number,
  cost: number,
|};

export type ExchangeFormContextValue = {|
  bonus: DataStateTypes.LoadableData<number>,
  onSubmit: () => void,
  isImmediatePurchaseAvailable: boolean,
  handleValue: (value: ExchangeFormValue) => void,
  formattedCost: number,
  amount: number,
  isHydrating: boolean,
  costPrecision: number,
  cost: number,
|};
