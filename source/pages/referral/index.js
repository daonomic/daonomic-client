// @flow
import { inject, observer } from 'mobx-react';
import { ReferralPage as ReferralPageView } from './view';

import type { ReferralProgramStore } from '~/domains/business/referral-program/store';
import type { Props } from './view';

export const ReferralPage = inject(
  ({
    referralProgramStore,
  }: {|
    referralProgramStore: ReferralProgramStore,
  |}): Props => ({
    referrals: referralProgramStore.referrals,
  }),
)(observer(ReferralPageView));
