// @flow
import * as React from 'react';
import { hot } from 'react-hot-loader';
import { I18nextProvider } from 'react-i18next';
import i18n from '~/i18n';
import MobxProvider from '~/components/mobx-provider';
import CurrentPage from '~/components/current-page';

function Root(props: { stores: {} }) {
  return (
    <I18nextProvider i18n={i18n}>
      <MobxProvider stores={props.stores}>
        <CurrentPage />
      </MobxProvider>
    </I18nextProvider>
  );
}

export default hot(module)(Root);
