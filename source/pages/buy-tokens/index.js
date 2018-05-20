// @flow
import { inject, observer } from 'mobx-react';
import BuyTokensPageView from './view';

import type { SaleStore } from '~/stores/sale';
import type { KycStore } from '~/stores/kyc';
import type { Props } from './view';

const ObservingBuyTokensPageView = observer(BuyTokensPageView);

export default inject(
  ({ sale, kyc }: { sale: SaleStore, kyc: KycStore }): Props => ({
    sale: {
      isStarted: sale.isStarted,
      isFinished: sale.isFinished,
      startTimestamp: sale.state.startTimestamp,
      endTimestamp: sale.state.endTimestamp,
    },
    isLoaded: sale.isLoaded && kyc.isLoaded,
    isAllowedToPay: kyc.isAllowed,
  }),
)(ObservingBuyTokensPageView);
