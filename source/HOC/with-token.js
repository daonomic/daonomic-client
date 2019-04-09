// @flow

import * as React from 'react';
import { TokenStore } from '~/domains/business/token/store';
import { inject } from 'mobx-react';

export const withToken = (
  mapTokenStoreToProps: (context: TokenStore) => mixed,
) => (Component: React.ComponentType<mixed>) => {
  const ComponentWithToken = (props: mixed) => <Component {...props} />;

  return inject(({ token }: { token: TokenStore }) =>
    mapTokenStoreToProps(token),
  )(ComponentWithToken);
};
