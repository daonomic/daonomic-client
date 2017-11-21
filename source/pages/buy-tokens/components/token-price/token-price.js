import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import Translation from '~/components/translation';
import Panel from '~/components/panel';
import Badge from '~/components/badge';
import Meter from '~/components/meter';
import textStyles from '~/components/text/text.css';
import styles from './token-price.css';

@inject(({ payment }) => ({
  tokensCount: payment.tokensCount,
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
    prices: PropTypes.arrayOf(PropTypes.shape({
      rate: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
    })).isRequired,
  };

  renderTokensCount = () => {
    const { tokensCount } = this.props;

    if (tokensCount.notLimited) {
      return null;
    }

    return (
      <div className={styles.section}>
        <h3 className={styles.title}>
          <Translation id="widgets:tokensSold" />
        </h3>

        <Meter value={(tokensCount.sold / tokensCount.total) || 0} />

        <p className={styles.sold}>
          {tokensCount.sold} <Translation id="tokenName" />
          {' '}
          <span className={textStyles.muted}>
            of {tokensCount.total}
          </span>
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
          <Translation id="widgets:tokenPrice" />
        </h3>

        {prices.map(({ rate, label }) => (
          <p key={label} className={styles.price}>
            1 {label} =
            {' '}
            <Badge>
              {rate}
            </Badge>
            {' '}
            <Translation id="tokenName" />
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
