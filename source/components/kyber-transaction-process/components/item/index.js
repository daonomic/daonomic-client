// @flow

import * as React from 'react';
import cns from 'classnames';
import { CheckCircle } from '~/components/icons/check-circle';

// $FlowFixMe
import { processTable } from './process-table';
import styles from './styles.css';

import type { PurchaseHooksTransactionState } from '~/providers/purchase-hooks/types';

type Props = {|
  id: PurchaseHooksTransactionState,
  isPassed: boolean,
  isCurrent: boolean,
|};

export class Item extends React.PureComponent<Props> {
  render() {
    const { id, isPassed, isCurrent } = this.props;

    return (
      <div
        className={cns(
          styles.root,
          { [styles.root_passed]: isPassed },
          { [styles.root_current]: isCurrent },
        )}
      >
        <div className={styles.icon}>
          <CheckCircle svgClassName={styles.svg} />
        </div>
        <div classNamse={styles.content}>
          <p>{processTable[id]}</p>
        </div>
      </div>
    );
  }
}
