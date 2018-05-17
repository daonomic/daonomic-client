// @flow
import { observer, inject } from 'mobx-react';
import TokenPriceView from './view';

import type { SaleStore } from '~/stores/sale';
import type { PaymentStore } from '~/stores/payment';
import type { Props } from './view';

const ObservingTokenPriceView = observer(TokenPriceView);

export default inject(
  ({ payment, sale }: { payment: PaymentStore, sale: SaleStore }): Props => ({
    tokenSymbol: sale.state.tokenSymbol,
    tokensCount: sale.state.tokensCount,
    prices: payment.prices,
  }),
)(ObservingTokenPriceView);
