// @flow
import { inject, observer } from 'mobx-react';
import { GeneratedWallet as GeneratedWalletView } from './view';

import type { Props } from './view';

export const GeneratedWallet = inject(
  ({ walletGenerator }): Props => ({
    generatedWallet: walletGenerator.generatedWallet,
    encryptedWallet: walletGenerator.encryptedWallet,
  }),
)(observer(GeneratedWalletView));
