// @flow
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { KyberButton as KyberButtonView } from './view';

import type { SaleStore } from '~/stores/sale';
import type { Props } from './view';

type ExternalProps = {
  ethAmount: number,
  children: React.Node,
};

export const KyberButton: React.ComponentType<ExternalProps> = inject(
  ({ sale }: { sale: SaleStore }): $Diff<Props, ExternalProps> => ({
    saleAddress: sale.state.address,
  }),
)(observer(KyberButtonView));
