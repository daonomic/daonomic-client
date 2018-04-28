import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { Badge, Meter, Panel, Text } from '@daonomic/ui';
import formatNumber from '~/i18n/format-number';
import config from '~/config';
import styles from './token-price.css';
import { getTranslation } from '~/i18n';

@inject(({ payment, sale }) => ({
  tokensCount: sale.state.tokensCount,
  prices: payment.prices,
}))
@observer
export default class TokenPrice extends Component {
  static propTypes = {
    tokensCount: PropTypes.shape({
      sold: PropTypes.number.isRequired,
      total: PropTypes.number.isRequired,
      notLimited: PropTypes.bool.isRequired,
    }).isRequired,
    prices: PropTypes.arrayOf(
      PropTypes.shape({
        rate: PropTypes.number.isRequired,
        label: PropTypes.string.isRequired,
      }),
    ).isRequired,
  };

  renderTokensCount = () => {
    const { tokensCount } = this.props;

    if (tokensCount.notLimited) {
      return null;
    }

    return (
      <div className={styles.section}>
        <h3 className={styles.title}>{getTranslation('widgets:tokensSold')}</h3>

        <Meter value={tokensCount.sold / tokensCount.total || 0} />

        <p className={styles.sold}>
          {formatNumber(tokensCount.sold)} {config.tokenName}{' '}
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
        <h3 className={styles.title}>{getTranslation('widgets:tokenPrice')}</h3>

        {prices.map(({ rate, label }) => (
          <p key={label} className={styles.price}>
            1 {label} = <Badge>{formatNumber(rate)}</Badge> {config.tokenName}
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
