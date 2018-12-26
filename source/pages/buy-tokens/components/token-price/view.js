// @flow
import * as React from 'react';
// $FlowFixMe
import { Trans } from '@lingui/macro';
import { Badge, Meter, Panel, Text } from '@daonomic/ui';
import styles from './token-price.css';
import { formatNumber } from '~/domains/app/i18n';

export type Props = {|
  tokenSymbol: string,
  tokensCount: {
    sold: number,
    total: number,
    notLimited: boolean,
  },
  prices: {
    rate: number,
    label: string,
  }[],
|};

export default class TokenPrice extends React.Component<Props> {
  renderTokensCount = () => {
    const { tokensCount } = this.props;

    if (tokensCount.notLimited) {
      return null;
    }

    return (
      <div className={styles.section}>
        <h3 className={styles.title}>
          <Trans>Tokens sold</Trans>
        </h3>

        <Meter value={tokensCount.sold / tokensCount.total || 0} />

        <p className={styles.sold}>
          {formatNumber(tokensCount.sold)} {this.props.tokenSymbol}{' '}
          <Text design="muted">of {formatNumber(tokensCount.total)}</Text>
        </p>
      </div>
    );
  };

  renderTokenPrice = () => {
    const { prices } = this.props;

    if (prices.length === 0) {
      return null;
    }

    return (
      <div className={styles.section}>
        <h3 className={styles.title}>
          <Trans>Token price</Trans>
        </h3>

        {prices.map(({ rate, label }) => (
          <p key={label} className={styles.price}>
            1 {label} = <Badge>{formatNumber(rate)}</Badge>{' '}
            {this.props.tokenSymbol}
          </p>
        ))}
      </div>
    );
  };

  render() {
    const { tokensCount, prices } = this.props;

    if (tokensCount.notLimited && prices.length === 0) {
      return null;
    }

    return (
      <Panel className={styles.root}>
        {this.renderTokenPrice()}
        {this.renderTokensCount()}
      </Panel>
    );
  }
}
