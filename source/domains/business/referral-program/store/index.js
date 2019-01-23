// @flow
import { observable, action } from 'mobx';
import { getReferrerToken } from './utils/get-referrer-token';

import * as ReferralProgramTypes from '~/domains/business/referral-program/types';
import * as DataStateTypes from '~/modules/data-state/types';

export class ReferralProgramStore {
  @observable
  userToken: DataStateTypes.LoadableData<ReferralProgramTypes.Token> = {
    dataState: 'initial',
  };

  @observable
  referrerToken: ?ReferralProgramTypes.Token;

  constructor() {
    this.referrerToken = getReferrerToken();
  }

  @action
  setUserToken = (
    userToken: DataStateTypes.LoadableData<ReferralProgramTypes.Token>,
  ) => {
    this.userToken = userToken;
  };

  @action
  reset = () => {
    this.setUserToken({ dataState: 'initial' });
  };
}

export const referralProgramStore = new ReferralProgramStore();
