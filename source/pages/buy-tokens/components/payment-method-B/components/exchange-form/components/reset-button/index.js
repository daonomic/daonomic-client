// @flow

import * as React from 'react';
import { compose } from 'ramda';
import { connectContext } from '~/HOC/connect-context';
import { ResetButtonView } from './view';
import { exchangeFormContext } from '~/pages/buy-tokens/components/payment-method-B/components/exchange-form/context';

import type { ResetButtonProps } from './types';
import type { ExchangeFormContextValue } from '~/pages/buy-tokens/components/payment-method-B/components/exchange-form/types';

const enhance = compose(
  connectContext(
    exchangeFormContext,
    (context: ExchangeFormContextValue): ResetButtonProps => ({
      onClick: context.reset,
    }),
  ),
);

export const ResetButton: React.ComponentType<mixed> = enhance(ResetButtonView);
