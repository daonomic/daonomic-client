// @flow
import * as React from 'react';
// $FlowFixMe
import { Panel } from '@daonomic/ui';
import { PaymentMethodHeading } from './components/heading';
import { PaymentMethodSelect } from './components/select';
import { PaymentInstruction } from './components/instruction';
import { PaymentMethodAddress } from './components/address';
import { ExchangeForm } from './components/exchange-form';
import { paymentMethodContext } from './context';
import styles from './styles.css';

import type { PaymentMethodProps } from './types';

export const PaymentMethodView = (props: PaymentMethodProps) => {
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
      {props.displayAddress && (
        <section className={styles.address}>
          <PaymentMethodAddress />
        </section>
      )}
      <Panel.Separator />
      <section>
        <PaymentInstruction />
      </section>
    </Panel>
  );
};
