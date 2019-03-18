// @flow

import React from 'react';
import { Button } from '@daonomic/ui';
// $FlowFixMe
import { Trans } from '@lingui/macro';
import * as DataStateTypes from '~/domains/data/data-state/types';
import styles from './styles.css';

type Props = {
  withdrawingState: DataStateTypes.DataState,
};

export function WithdrawButton(props: Props) {
  const { withdrawingState, ...restProp } = props;

  return (
    <span className={styles.button}>
      <Button size="s" disabled={withdrawingState === 'loading'} {...restProp}>
        <Trans>Withdraw</Trans>
      </Button>
      {withdrawingState === 'failed' && (
        <span className={styles.error}>
          <Trans>Something went wrong</Trans>
        </span>
      )}
    </span>
  );
}
