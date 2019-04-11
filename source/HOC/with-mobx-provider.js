// @flow

import * as React from 'react';
import { MobxProvider } from '~/components/mobx-provider';
import { stores } from '~/domains/app/stores';

export const withMobxProvider = (Component: React.ComponentType<mixed>) => {
  return (props: mixed) => (
    <MobxProvider stores={stores}>
      <Component {...props} />
    </MobxProvider>
  );
};
