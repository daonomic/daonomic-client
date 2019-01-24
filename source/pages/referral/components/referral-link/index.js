// @flow
import { inject, observer } from 'mobx-react';
import { ReferralLink as ReferralLinkView } from './view';

import type { ReferralProgramStore } from '~/domains/business/referral-program/store';
import type { Props } from './view';

export const ReferralLink = inject(
  ({
    referralProgramStore,
  }: {|
    referralProgramStore: ReferralProgramStore,
  |}): Props => ({
    userToken: referralProgramStore.userToken,
  }),
)(observer(ReferralLinkView));
