// @flow
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { KyberButton as KyberButtonView } from './view';

import { TokenStore } from '~/domains/business/token/store';
import type { UserDataStore } from '~/domains/business/user-data/store';
import type { Props } from './view';

type ExternalProps = {
  ethAmount: number,
  children: React.Node,
};

export const KyberButton: React.ComponentType<ExternalProps> = inject(
  ({
    token,
    userData,
  }: {|
    token: TokenStore,
    userData: UserDataStore,
  |}): $Diff<Props, ExternalProps> => ({
    saleAddress: token.sale ? token.sale.data.address : '',
    buyerAddress: userData.model.address,
  }),
)(observer(KyberButtonView));
