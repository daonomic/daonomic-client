// @flow
import { autorun } from 'mobx';

import type { IAuth } from '~/stores/auth/types';
import type { IReferralProgramService } from '~/modules/referral-program/types';

export function initReferralProgramTokenService(
  auth: IAuth,
  referralProgramService: IReferralProgramService,
) {
  autorun(() => {
    if (auth.isAuthenticated) {
      referralProgramService.loadAndSetUserToken();
    } else {
      referralProgramService.reset();
    }
  });
}
