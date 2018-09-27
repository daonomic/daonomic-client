// @flow
import { observable, action } from 'mobx';
import { loadUserToken } from '~/modules/referral-program/api';
import { getReferrerToken } from '~/modules/referral-program/utils';

import type { IReferralProgramService } from '~/modules/referral-program/types';
import * as ReferralProgramTypes from '~/modules/referral-program/types';
import * as DataStateTypes from '~/modules/data-state/types';

class ReferralProgramService implements IReferralProgramService {
  @observable
  userToken: DataStateTypes.LoadableData<ReferralProgramTypes.Token> = {
    dataState: 'initial',
  };

  @observable
  referrerToken;

  constructor() {
    this.referrerToken = getReferrerToken();
  }

  loadAndSetUserToken = async () => {
    this.setUserToken({ dataState: 'loading' });

    try {
      const token = await loadUserToken();

      this.setUserToken({ dataState: 'loaded', data: token });
    } catch (error) {
      this.setUserToken({ dataState: 'failed' });
    }
  };

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

export const referralProgramService: IReferralProgramService = new ReferralProgramService();
