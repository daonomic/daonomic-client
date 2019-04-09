// @flow

import * as React from 'react';
import { compose } from 'ramda';
import { CostInputView } from './view';
import { connectContext } from '~/HOC/connect-context';
import { exchangeFormContext } from '~/pages/buy-tokens/components/payment-method-B/components/exchange-form/context';

import type { CostInputProps } from './types';
import type { ExchangeFormContextValue } from '~/pages/buy-tokens/components/payment-method-B/components/exchange-form/types';

const enhance = compose(
  connectContext(
    exchangeFormContext,
    (context: ExchangeFormContextValue): CostInputProps => ({
      isHydrating: context.isHydrating,
      bonus: context.bonus,
      costPrecision: context.costPrecision,
      amount: context.amount,
      selectedPaymentMethod: context.selectedPaymentMethod,
      formattedCost: context.formattedCost,
      handleValue: context.handleValue,
      cost: context.cost,
    }),
  ),
);

export const CostInput: React.ComponentType<{}> = enhance(CostInputView);
