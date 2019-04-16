// @flow

import React from 'react';
import { IconCross } from '~/components/icons/cross';
import { i18n } from '~/domains/app/i18n';

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
      <p className={styles.paragraph}>
        <Trans>
          You just successfully purchased{' '}
          <b>
            {amount}
            {props.purchasingTokenSymbol}
          </b>{' '}
          tokens. Tokens were added to your wallet automatically
        </Trans>
      </p>
      <button
        aria-label={i18n._(`Close alert`)}
        onClick={props.onClose}
        className={styles.close}
      >
        <IconCross className={styles.icon} />
      </button>
    </div>
  );
};
