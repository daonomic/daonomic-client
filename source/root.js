// @flow
import * as React from 'react';
import { compose } from 'ramda';
import { withAvailablePaymentMethodsProvider } from '~/providers/available-payment-methods';
import { hot } from 'react-hot-loader';
import { MobxProvider } from '~/components/mobx-provider';
import { CurrentPage } from '~/components/current-page';
import { withI18Provider } from '~/domains/app/i18n';

function RootView(props: { stores: {} }) {
  return (
    <MobxProvider stores={props.stores}>
      <CurrentPage />
    </MobxProvider>
  );
}

const enhance = compose(
  hot(module),
  withI18Provider,
  withAvailablePaymentMethodsProvider,
);

export const Root = enhance(RootView);
