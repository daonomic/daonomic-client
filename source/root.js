// @flow

import { compose } from 'ramda';
import { hot } from 'react-hot-loader';
import { CurrentPage } from '~/components/current-page';
import { withMobxProvider } from '~/HOC/with-mobx-provider';
import { withI18Provider } from '~/domains/app/i18n';
import { withTokenPurchaseModal } from '~/domains/business/token-purchase/react';

const enhance = compose(
  hot(module),
  withI18Provider,
  withMobxProvider,
  withTokenPurchaseModal,
);

export const Root = enhance(CurrentPage);
