// @flow

import { i18n } from '~/domains/app/i18n';

// $FlowFixMe
import { t } from '@lingui/macro';

import type { TokenPurchaseTransactionState } from '~/domains/business/token-purchase/types';

export const processTable: {
  [key: TokenPurchaseTransactionState]: string,
} = {
  idle: i18n._(t`Awaiting for start`),
  balance_checking: i18n._(t`Checking balance`),
  allowance_checking: i18n._(t`Checking allowance`),
  approving: i18n._(t`Authorize contract to transfer your tokens`),
  transfer: i18n._(t`Make a purchase`),
  transfered: i18n._(t`Success!`),
};
