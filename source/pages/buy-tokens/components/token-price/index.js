// @flow
import { observer, inject } from 'mobx-react';
import TokenPriceView from './view';

import type { SaleStore } from '~/domains/business/sale/store';
import type { PaymentStore } from '~/domains/business/payment/store';
import type { Props } from './view';

export const TokenPrice = inject(
  ({ payment, sale }: {| payment: PaymentStore, sale: SaleStore |}): Props => ({
    tokenSymbol: sale.state.tokenSymbol,
    tokensCount: sale.state.tokensCount,
    prices: payment.publicPrices,
  }),
)(observer(TokenPriceView));
