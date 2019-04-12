// @flow

import { compose } from 'ramda';
import { connectContext } from '~/HOC/connect-context';
import { exchangeFormContext } from '~/pages/buy-tokens/components/payment-method-B/components/exchange-form/context';
import { LastTransactionView } from './view';

import type { ExchangeFormContextValue } from '~/pages/buy-tokens/components/payment-method-B/components/exchange-form/types';
import type { LastTransactionProps } from './types';

const enhance = compose(
  connectContext(
    exchangeFormContext,
    (context: ExchangeFormContextValue): LastTransactionProps => ({
      lastTransaction: context.lastTransaction,
      purchasingTokenSymbol: context.purchasingTokenSymbol,
      onClose: () => {
        context.reset();
      },
    }),
  ),
);

export const LastTransaction = enhance(LastTransactionView);
