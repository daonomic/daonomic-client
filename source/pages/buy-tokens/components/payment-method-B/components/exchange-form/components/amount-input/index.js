// @flow

import * as React from 'react';
import { compose } from 'ramda';
import { AmountInputView } from './view';
import { connectContext } from '~/HOC/connect-context';
import { exchangeFormContext } from '~/pages/buy-tokens/components/payment-method-B/components/exchange-form/context';

import type { AmountInputProps } from './types';
import type { ExchangeFormContextValue } from '~/pages/buy-tokens/components/payment-method-B/components/exchange-form/types';

const enhance = compose(
  connectContext(
    exchangeFormContext,
    (context: ExchangeFormContextValue): AmountInputProps => ({
      isHydrating: context.isHydrating,
      amount: context.amount,
      handleValue: context.handleValue,
      cost: context.cost,
      tokenSymbol: context.tokenSymbol,
    }),
  ),
);

export const AmountInput: React.ComponentType<{}> = enhance(AmountInputView);
