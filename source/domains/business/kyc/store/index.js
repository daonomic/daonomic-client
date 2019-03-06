// @flow
import { observable, action, computed, toJS } from 'mobx';

import * as DataStateTypes from '~/domains/data/data-state/types';
import type { State } from '~/domains/business/kyc/types';

export class KycStore {
  @observable observableState: DataStateTypes.LoadableData<State> = {
    dataState: 'idle',
  };

  @computed
  get state(): DataStateTypes.LoadableData<State> {
    return toJS(this.observableState);
  }

  @computed
  get isAllowed(): boolean {
    return (
      this.observableState.dataState === 'loaded' &&
      this.observableState.data.status === 'ALLOWED'
    );
  }

  @computed
  get isNotSet(): boolean {
    return (
      this.observableState.dataState === 'loaded' &&
      this.observableState.data.status === 'NOT_SET'
    );
  }

  @action
  setState = (state: DataStateTypes.LoadableData<State>) => {
    this.observableState = state;
  };

  @action
  reset = () => {
    this.observableState = { dataState: 'idle' };
  };
}

export const kyc = new KycStore();
