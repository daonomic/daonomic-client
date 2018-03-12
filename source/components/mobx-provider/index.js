// @flow
import * as React from 'react';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';
import rootStore from '~/stores';

// Set strict mode to forbid changing state outside of an action
useStrict(true);

export default function MobxProvider(props: {}) {
  return <Provider {...props} {...rootStore} />;
}
