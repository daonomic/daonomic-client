// @flow
import { inject, observer } from 'mobx-react';
import { CreateWalletPage as CreateWalletPageView } from './view';

import type { Props } from './view';

export const CreateWalletPage = inject(
  ({ walletGenerator }): Props => ({
    isGenerated: walletGenerator.isGenerated,
  }),
)(observer(CreateWalletPageView));
