// @flow
import * as React from 'react';
import { hot } from 'react-hot-loader';
import MobxProvider from '~/components/mobx-provider';
import { CurrentPage } from '~/components/current-page';
import { I18nProvider } from '~/domains/app/i18n';

function Root(props: { stores: {} }) {
  return (
    <I18nProvider>
      <MobxProvider stores={props.stores}>
        <CurrentPage />
      </MobxProvider>
    </I18nProvider>
  );
}

export default hot(module)(Root);
