// @flow

import { compose } from 'ramda';
import { withAvailablePaymentMethodsProvider } from '~/providers/available-payment-methods';
import { hot } from 'react-hot-loader';
import { CurrentPage } from '~/components/current-page';
import { withMobxProvider } from '~/HOC/with-mobx-provider';
import { withI18Provider } from '~/domains/app/i18n';
import { withPurchaseHooksProvider } from '~/providers/purchase-hooks';
import { withPublicPricesProvider } from '~/providers/public-prices';
import { withContractProxiesProvider } from '~/providers/contract-proxies';

const enhance = compose(
  hot(module),
  withI18Provider,
  withMobxProvider,
  withAvailablePaymentMethodsProvider,
  withPublicPricesProvider,
  withContractProxiesProvider,
  withPurchaseHooksProvider,
);

export const Root = enhance(CurrentPage);
