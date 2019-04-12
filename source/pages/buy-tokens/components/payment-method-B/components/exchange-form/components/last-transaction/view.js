// @flow

import React from 'react';
import { Heading } from '~/components/heading';
import { IconCross } from '~/components/icons/cross';

// $FlowFixMe
import { Trans } from '@lingui/macro';

import styles from './styles.css';

import type { LastTransactionProps } from './types';

export const LastTransactionView = (props: LastTransactionProps) => {
  if (!props.lastTransaction) {
    return null;
  }

  const { amount } = props.lastTransaction;

  return (
    <div className={styles.root}>
      <Heading size="normal" tagName="h2" className={styles.heading}>
        <Trans>Congratulations!</Trans>
      </Heading>
      <p className={styles.paragraph}>
        <Trans>
          You just successfully purchased{' '}
          <b>
            {amount}
            {props.purchasingTokenSymbol}
          </b>{' '}
          tokens. Tokens was added to your wallet automatically
        </Trans>
      </p>
      <button onClick={props.onClose} className={styles.close}>
        <IconCross className={styles.icon} />
      </button>
    </div>
  );
};
