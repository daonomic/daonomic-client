// @flow

import * as React from 'react';
import { tokenExchangeCalculations } from '~/domains/business/token-exchange-calculations';
import styles from './styles.css';

// $FlowFixMe
import { Trans } from '@lingui/macro';

export const ResetButton = () => {
  return (
    <button
      className={styles.button}
      onClick={(event: SyntheticInputEvent<HTMLSelectElement>) => {
        event.preventDefault();
        tokenExchangeCalculations.handleState(() => ({
          cost: 0,
          amount: 0,
          isHydrating: false,
          hasError: false,
        }));
      }}
    >
      <Trans>Reset calculations</Trans>
    </button>
  );
};
