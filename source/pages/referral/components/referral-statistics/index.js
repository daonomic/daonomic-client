// @flow
import { inject, observer } from 'mobx-react';
import { ReferralStatistics as ReferralStatisticsView } from './view';

import type { ReferralProgramStore } from '~/domains/business/referral-program/store';
import type { Props } from './view';

export const ReferralStatistics = inject(
  ({
    referralProgramStore,
  }: {|
    referralProgramStore: ReferralProgramStore,
  |}): Props => ({
    userData: referralProgramStore.userData,
  }),
)(observer(ReferralStatisticsView));
