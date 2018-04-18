import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { tokenName } from '~/config';
import { Panel } from '@daonomic/ui';
import Translation from '~/components/translation';
import formatNumber from '~/i18n/format-number';
import styles from './balance.css';

@inject(({ walletBalance }) => ({
  balance: walletBalance.state.balance,
}))
@observer
export default class Balance extends Component {
  static propTypes = {
    balance: PropTypes.number.isRequired,
  };

  render() {
    const { balance } = this.props;

    return (
      <Panel className={styles.root}>
        <h3 className={styles.title}>
          <Translation id="widgets:yourWalletBalance" />
        </h3>

        <p className={styles.balance}>
          {formatNumber(balance)} {tokenName}
        </p>
      </Panel>
    );
  }
}
