// @flow
import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { HeaderNavigation as HeaderNavigationView } from './view';

import type { Props } from './view';
import type { ReferralProgramStore } from '~/domains/business/referral-program/store';
import type { RouterStore } from '~/domains/app/router/store';

type ExternalProps = {||};

export const HeaderNavigation: React.ComponentType<ExternalProps> = inject(
  ({
    referralProgramStore,
    router,
  }: {|
    referralProgramStore: ReferralProgramStore,
    router: RouterStore,
  |}): $Diff<Props, ExternalProps> => ({
    isReferralSupported: referralProgramStore.isSupportedBySale,
    currentRouteName: (router.currentRoute || {}).name || '',
  }),
)(observer(HeaderNavigationView));
