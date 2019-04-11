// @flow

import { compose } from 'ramda';
import { ExchangeFormView } from './view';
import { exchangeFormContext, withExchangeFormProvider } from './context';
import { withToken } from '~/HOC/with-token';
import { connectContext } from '~/HOC/connect-context';

import * as ExchangeFormTypes from './types';

const enhance = compose(
  withToken((tokenStore) => ({
    tokenSymbol: tokenStore.symbol,
  })),
  withExchangeFormProvider,
  connectContext(
    exchangeFormContext,
    (
      context: ExchangeFormTypes.ExchangeFormContextValue,
    ): ExchangeFormTypes.ExchangeFormViewProps => ({
      onSubmit: context.handleSubmit,
      displayResetButton: context.cost !== 0,
      hasFetchError: context.hasFetchError,
    }),
  ),
);

export const ExchangeForm = enhance(ExchangeFormView);
