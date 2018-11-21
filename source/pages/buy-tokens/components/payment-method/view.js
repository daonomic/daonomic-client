// @flow
import * as React from 'react';
import { Panel } from '@daonomic/ui';
import { Heading } from '~/components/heading';
import { getTranslation } from '~/domains/app/i18n';
import ExchangeForm from './exchange-form';
import { getMarker } from '~/utils/get-marker';
import { PaymentMethodSelect } from './select';
import { PaymentMethodAddress } from './address';
import { Payments } from './payments';
import { PaymentInstruction } from './instruction';
import styles from './styles.css';

import type { PaymentMethod } from '~/types/payment';

export type Props = {|
  selectedPaymentMethod: ?PaymentMethod,
|};

export default class PaymentMethodView extends React.Component<Props> {
  marker = getMarker('payment-method');

  render() {
    return (
      <Panel data-marker={this.marker()}>
        <Heading className={styles.title} tagName="h2" size="normal">
          {getTranslation('paymentMethods:title')}
        </Heading>

        <PaymentMethodSelect />
        <Panel.Separator />
        {this.props.selectedPaymentMethod && (
          <ExchangeForm
            paymentMethodRate={this.props.selectedPaymentMethod.rate}
          />
        )}
        <Panel.Separator />
        <PaymentMethodAddress />
        <Panel.Separator />
        <Payments />
        <Panel.Separator />
        <PaymentInstruction />
      </Panel>
    );
  }
}
