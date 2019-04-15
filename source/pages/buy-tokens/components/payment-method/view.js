// @flow

import * as React from 'react';

// $FlowFixMe
import { Trans } from '@lingui/macro';

import { Panel } from '@daonomic/ui';
import { Heading } from '~/components/heading';
import { PaymentMethodSelect } from './components/select';
import { PaymentInstruction } from './components/instruction';
import { PaymentMethodAddress } from './components/address';
import { ExchangeForm } from './components/exchange-form';

import styles from './styles.css';

export type PaymentMethodProps = {
  shouldDisplayAddress: boolean,
  shouldDisplayExchangeForm: boolean,
};

export const PaymentMethodView = (props: PaymentMethodProps) => {
  return (
    <Panel>
      <section className={styles.title}>
        <Heading tagName="h2" size="normal">
          <Trans>Step 2: Buy tokens</Trans>
        </Heading>
      </section>
      <section>
        <PaymentMethodSelect />
      </section>
      {props.shouldDisplayExchangeForm && (
        <section className={styles.exchange}>
          <ExchangeForm />
        </section>
      )}
      {props.shouldDisplayAddress && (
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
