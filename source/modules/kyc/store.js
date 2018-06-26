// @flow
import { observable, action } from 'mobx';

import type { DataState } from '~/types/common';
import type { State } from '~/modules/kyc/types';

class KycModel {
  @observable dataState: DataState = 'initial';
  @observable
  state: State = {
    status: 'NOT_SET',
  };
}

export class KycStore {
  @observable model = new KycModel();

  @action
  setDataState = (dataState: DataState) => {
    this.model.dataState = dataState;
  };

  @action
  setState = (state: State) => {
    this.model.state = state;
  };

  @action
  reset = () => {
    this.model = new KycModel();
  };
}

export const kyc = new KycStore();
