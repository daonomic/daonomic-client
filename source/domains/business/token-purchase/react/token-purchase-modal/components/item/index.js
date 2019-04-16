// @flow

import * as React from 'react';
import cns from 'classnames';
import { CheckCircle } from '~/components/icons/check-circle';

// $FlowFixMe
import { processTable } from './process-table';
import styles from './styles.css';

import type { TokenPurchaseTransactionState } from '~/domains/business/token-purchase/types';

type Props = {|
  id: TokenPurchaseTransactionState,
  isPassed: boolean,
  isCurrent: boolean,
  isLoadable: boolean,
|};

export class Item extends React.PureComponent<Props> {
  render() {
    const { id, isPassed, isCurrent, isLoadable } = this.props;

    return (
      <div
        className={cns(
          styles.root,
          { [styles.root_passed]: isPassed },
          { [styles.root_current]: isCurrent },
          { [styles.root_loadable]: isLoadable },
        )}
      >
        <div className={styles.icon}>
          <CheckCircle svgClassName={styles.svg} />
        </div>
        <div className={styles.content}>
          <p>{processTable[id]}</p>
        </div>
      </div>
    );
  }
}
