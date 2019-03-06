// @flow
import * as React from 'react';
// $FlowFixMe
import { Trans } from '@lingui/macro';
import { observer } from 'mobx-react';
import { Panel } from '@daonomic/ui';
import { Heading } from '~/components/heading';
import { ExchangeForm } from './exchange-form';
import { getMarker } from '~/utils/get-marker';
import { PaymentMethodSelect } from './select';
import { PaymentMethodAddress } from './address';
import { Payments } from './payments';
import { PaymentInstruction } from './instruction';
import styles from './styles.css';

import type { SaleStore } from '~/domains/business/sale/store';

type Props = {|
  sale: SaleStore,
|};

class PaymentMethodView extends React.Component<Props> {
  marker = getMarker('payment-method');

  componentDidMount() {
    this.props.sale.payment.loadCurrentMethod();
  }

  render() {
    const { sale } = this.props;

    return (
      <Panel data-marker={this.marker()}>
        <Heading className={styles.title} tagName="h2" size="normal">
          <Trans>Step 2: Buy tokens</Trans>
        </Heading>

        <PaymentMethodSelect marker={this.marker} sale={sale} />
        <Panel.Separator />
        {sale.payment.selectedMethod && (
          <ExchangeForm
            saleId={sale.data.id}
            paymentMethodRate={sale.payment.selectedMethod.rate}
            paymentMethodId={sale.payment.selectedMethod.id}
          />
        )}
        <Panel.Separator />
        <PaymentMethodAddress sale={sale} />
        <Panel.Separator />
        <Payments sale={sale} />
        <Panel.Separator />
        <PaymentInstruction data-marker={this.marker('instruction')()} />
      </Panel>
    );
  }
}

export const PaymentMethod: React.ComponentType<Props> = observer(
  PaymentMethodView,
);
