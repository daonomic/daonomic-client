// @flow

import * as React from 'react';
import { compose } from 'ramda';
import { connectContext } from '~/HOC/connect-context';
import { SubmitButtonView } from './view';
import { exchangeFormContext } from '~/pages/buy-tokens/components/payment-method-B/components/exchange-form/context';

import type { SubmitButtonProps } from './types';
import type { ExchangeFormContextValue } from '~/pages/buy-tokens/components/payment-method-B/components/exchange-form/types';

const enhance = compose(
  connectContext(
    exchangeFormContext,
    (context: ExchangeFormContextValue): SubmitButtonProps => ({
      disabled: !context.isMaySubmit,
      isKyber: context.isKyber,
    }),
  ),
);

export const SubmitButton: React.ComponentType<{}> = enhance(SubmitButtonView);
