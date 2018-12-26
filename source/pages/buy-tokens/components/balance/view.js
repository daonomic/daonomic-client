// @flow
import * as React from 'react';
// $FlowFixMe
import { Trans } from '@lingui/macro';
import { Panel } from '@daonomic/ui';
import styles from './balance.css';
import { formatNumber } from '~/domains/app/i18n';
import { getMarker } from '~/utils/get-marker';

export type Props = {|
  balance: number,
  tokenSymbol: string,
|};

export default class Balance extends React.Component<Props> {
  marker = getMarker('balance');

  render() {
    return (
      <Panel data-marker={this.marker()} className={styles.root}>
        <h3 className={styles.title}>
          <Trans>Your wallet balance</Trans>
        </h3>

        <p className={styles.balance}>
          <span
            data-marker={this.marker('amount')()}
            data-raw-value={this.props.balance}
          >
            {formatNumber(this.props.balance)}
          </span>{' '}
          {this.props.tokenSymbol}
        </p>
      </Panel>
    );
  }
}
