// @flow
import { inject, observer } from 'mobx-react';
import { loadAndSetKycState } from '~/modules/kyc/actions';
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
      loadAndSetKycState();

      if (referralProgramStore.isAvailable) {
        referralProgramStore.referrals.loadPage(1);
      }
    },
  }),
)(observer(ReferralPageView));
