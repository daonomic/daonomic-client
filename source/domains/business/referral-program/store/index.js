// @flow
import { observable, action } from 'mobx';
import { getReferrerData } from './utils/get-referrer-data';

import * as ReferralProgramTypes from '~/domains/business/referral-program/types';
import * as DataStateTypes from '~/modules/data-state/types';

export class ReferralProgramStore {
  @observable
  userToken: DataStateTypes.LoadableData<ReferralProgramTypes.Token> = {
    dataState: 'initial',
  };

  @observable
  referrerData: ?ReferralProgramTypes.Data;

  constructor() {
    this.referrerData = getReferrerData();
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
