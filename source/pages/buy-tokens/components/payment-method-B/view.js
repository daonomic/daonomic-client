// @flow
import * as React from 'react';
// $FlowFixMe
import { Panel } from '@daonomic/ui';
import { PaymentMethodHeading } from './components/heading';
import { PaymentMethodSelect } from './components/select';
import { PaymentInstruction } from './components/instruction';
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
        {(context) =>
          context.selectedPaymentMethod && (
            <section className={styles.exchange}>
              <ExchangeForm />
            </section>
          )
        }
      </paymentMethodContext.Consumer>
      <Panel.Separator />
      <section>
        <PaymentInstruction />
      </section>
    </Panel>
  );
};
