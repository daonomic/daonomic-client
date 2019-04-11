// @flow

import type { SalePublicPrice } from '~/domains/business/sale/types';

export type PublicPricesContextValue = {
  publicPrices: ?(SalePublicPrice[]),
};
