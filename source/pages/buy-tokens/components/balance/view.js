// @flow
import * as React from 'react';
import { Panel } from '@daonomic/ui';
import formatNumber from '~/i18n/format-number';
import styles from './balance.css';
import { getTranslation } from '~/i18n';

export type Props = {|
  balance: number,
  tokenSymbol: string,
|};

export default class Balance extends React.Component<Props> {
  render() {
    return (
      <Panel className={styles.root}>
        <h3 className={styles.title}>
          {getTranslation('widgets:yourWalletBalance')}
        </h3>

        <p className={styles.balance}>
          {formatNumber(this.props.balance)} {this.props.tokenSymbol}
        </p>
      </Panel>
    );
  }
}
