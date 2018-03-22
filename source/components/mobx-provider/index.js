// @flow
import * as React from 'react';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';

// Set strict mode to forbid changing state outside of an action
useStrict(true);

type MobxProviderProps = {
  children: React.Node,
  stores: {},
};

export default function MobxProvider(props: MobxProviderProps) {
  return <Provider {...props.stores}>{props.children}</Provider>;
}
