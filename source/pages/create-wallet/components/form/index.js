// @flow
import { inject, observer } from 'mobx-react';
import { CreateWalletForm as CreateWalletFormView } from './view';

import type { Props } from './view';

export const CreateWalletForm = inject(
  ({ walletGenerator }): Props => ({
    isLoading: walletGenerator.isGenerating,
    progress: walletGenerator.progress,
    onSave: (password) => walletGenerator.generate({ password }),
  }),
)(observer(CreateWalletFormView));
