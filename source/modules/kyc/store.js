// @flow
import { observable, action, computed, toJS } from 'mobx';

import type { LoadableData } from '~/modules/data-state/types';
import type { State } from '~/modules/kyc/types';

export class KycStore {
  @observable observableState: LoadableData<State> = { dataState: 'initial' };

  @computed
  get state(): LoadableData<State> {
    return toJS(this.observableState);
  }

  @computed
  get isAllowed(): boolean {
    return (
      this.state.dataState === 'loaded' && this.state.data.status === 'ALLOWED'
    );
  }

  @action
  setState = (state: LoadableData<State>) => {
    this.observableState = state;
  };

  @action
  reset = () => {
    this.observableState = { dataState: 'initial' };
  };
}

export const kyc = new KycStore();
