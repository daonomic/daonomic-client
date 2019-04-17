// @flow

import * as React from 'react';
import cns from 'classnames';
import { CheckCircle } from '~/components/icons/check-circle';
import { IconFail } from '@daonomic/ui';

// $FlowFixMe
import { processTable } from './process-table';
import styles from './styles.css';

import type { TokenPurchaseTransactionState } from '~/domains/business/token-purchase/types';

type Props = {|
  id: TokenPurchaseTransactionState,
  isPassed: boolean,
  isCurrent: boolean,
  isLoading: boolean,
  isFailed: boolean,
|};

export const Item = (props: Props) => (
  <div
    className={cns(
      styles.root,
      { [styles.root_passed]: props.isPassed },
      { [styles.root_current]: props.isCurrent },
      { [styles.root_loadable]: props.isLoading },
      { [styles.root_failed]: props.isFailed },
    )}
  >
    <div className={styles.icon}>
      {!props.isFailed ? (
        <CheckCircle svgClassName={styles.svg} />
      ) : (
        <IconFail size={80} />
      )}
    </div>
    <div className={styles.content}>
      <p>{processTable[props.id]}</p>
    </div>
  </div>
);
