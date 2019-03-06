// @flow
import { inject, observer } from 'mobx-react';
import { kycService } from '~/domains/business/kyc';
import { ReferralPage as ReferralPageView } from './view';

import type { ReferralProgramStore } from '~/domains/business/referral-program/store';
import type { Props } from './view';

export const ReferralPage = inject(
  ({
    referralProgramStore,
  }: {|
    referralProgramStore: ReferralProgramStore,
  |}): Props => ({
    isReferralAvailable: referralProgramStore.isAvailable,
    referrals: referralProgramStore.referrals,
    onMount: () => {
      kycService.loadKycState();

      if (referralProgramStore.isAvailable) {
        referralProgramStore.referrals.loadPage(1);
      }
    },
  }),
)(observer(ReferralPageView));
