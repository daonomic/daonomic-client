// @flow
import * as React from 'react';
// $FlowFixMe
import { Panel } from '@daonomic/ui';
import { PaymentMethodHeading } from './components/heading';
// import { MarkerableComponent } from "~/components/markerable-component";
import { PaymentMethodSelect } from './components/select';
// import { PaymentMethodAddress } from './address';
// import { PaymentInstruction } from './instruction';
import { ExchangeForm } from './components/exchange-form';
import { paymentMethodContext } from './context';
import styles from './styles.css';

export const PaymentMethodView = () => {
  return (
    <Panel>
      <section className={styles.title}>
        <PaymentMethodHeading />
      </section>
      <section>
        <PaymentMethodSelect />
      </section>
      <paymentMethodContext.Consumer>
        {(context) => context.selectedPaymentMethod && <ExchangeForm />}
      </paymentMethodContext.Consumer>
      {/* <Panel.Separator />
      <section>
        <PaymentMethodAddress />
      </section>
      <Panel.Separator />
      <section>
        <PaymentInstruction />
      </section> */}
    </Panel>
  );
};
