// @flow

import type { PurchaseTransactionData } from '~/pages/buy-tokens/components/payment-method-B/components/exchange-form/types';

export type LastTransactionProps = {|
  lastTransaction: ?PurchaseTransactionData,
  onClose: () => void,
  purchasingTokenSymbol: string,
|};
