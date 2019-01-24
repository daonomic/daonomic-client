// @flow
import { observable, action } from 'mobx';
import { getReferrerData } from './utils/get-referrer-data';
import { PaginatedList } from '~/domains/data/paginated-list';
import { referralProgramApi } from '~/domains/business/referral-program/api';

import * as ReferralProgramTypes from '~/domains/business/referral-program/types';
import * as DataStateTypes from '~/modules/data-state/types';

export class ReferralProgramStore {
  @observable
  userToken: DataStateTypes.LoadableData<ReferralProgramTypes.Token> = {
    dataState: 'initial',
  };

  @observable
  referrerData: ?ReferralProgramTypes.Data;

  @observable
  referrals: PaginatedList<
    ReferralProgramTypes.Referral,
    ReferralProgramTypes.Referral,
    void,
  > = new PaginatedList({
    countPerPage: 10,
    load: referralProgramApi.loadReferrals,
    view: (x) => x,
  });

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
