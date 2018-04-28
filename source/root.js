// @flow
import * as React from 'react';
import { hot } from 'react-hot-loader';
import MobxProvider from '~/components/mobx-provider';
import CurrentPage from '~/components/current-page';

function Root(props: { stores: {} }) {
  return (
    <MobxProvider stores={props.stores}>
      <CurrentPage />
    </MobxProvider>
  );
}

export default hot(module)(Root);
