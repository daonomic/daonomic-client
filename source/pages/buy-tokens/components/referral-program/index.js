// @flow
import { inject, observer } from 'mobx-react';
import { ReferralProgram as ReferralProgramView } from './view';

import type { IReferralProgramService } from '~/modules/referral-program/types';
import type { Props } from './view';

export const ReferralProgram = inject(
  ({
    referralProgramService,
  }: {
    referralProgramService: IReferralProgramService,
  }): Props => ({
    userToken: referralProgramService.userToken,
  }),
)(observer(ReferralProgramView));
