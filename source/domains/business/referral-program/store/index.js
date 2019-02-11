// @flow
import { observable, action } from 'mobx';
import { getReferrerData } from './utils/get-referrer-data';
import { PaginatedList } from '~/domains/data/paginated-list';
import { referralProgramApi } from '~/domains/business/referral-program/api';

import * as ReferralProgramTypes from '~/domains/business/referral-program/types';
import * as DataStateTypes from '~/domains/data/data-state/types';

export class ReferralProgramStore {
  @observable
  isSupportedBySale: boolean = false;

  @observable
  isAvailable: boolean = false;

  @observable
  userData: DataStateTypes.LoadableData<ReferralProgramTypes.UserData> = {
    dataState: 'initial',
  };

  @observable
  referrerData: ?ReferralProgramTypes.ReferrerData;

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
  setUserData = (
    userData: DataStateTypes.LoadableData<ReferralProgramTypes.UserData>,
  ) => {
    this.userData = userData;
  };

  @action
  setSupport = ({ isSupported }: {| isSupported: boolean |}) => {
    this.isSupportedBySale = isSupported;
  };

  @action
  setAvailability = ({ isAvailable }: {| isAvailable: boolean |}) => {
    this.isAvailable = isAvailable;
  };

  reset = () => {
    this.setSupport({ isSupported: false });
    this.setAvailability({ isAvailable: false });
    this.setUserData({ dataState: 'initial' });
  };
}

export const referralProgramStore = new ReferralProgramStore();
