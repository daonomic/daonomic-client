// @flow
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { Payments as PaymentsView } from './view';

import { TokenStore } from '~/domains/business/token/store';
import { SaleStore } from '~/domains/business/sale/store';
import type { Props } from './view';

type ExternalProps = {|
  sale: SaleStore,
|};

export const Payments: React.ComponentType<ExternalProps> = inject(
  ({ token }: {| token: TokenStore |}): $Diff<Props, ExternalProps> => ({
    tokenSymbol: token.symbol,
  }),
)(observer(PaymentsView));
