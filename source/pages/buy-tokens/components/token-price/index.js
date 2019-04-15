// @flow
import * as React from 'react';

// $FlowFixMe
import { Trans, NumberFormat } from '@lingui/macro';

import { observer } from 'mobx-react';
import { Badge, Meter, Panel, Text } from '@daonomic/ui';
import { getMarker } from '~/utils/get-marker';
import styles from './styles.css';

import type { SaleStore } from '~/domains/business/sale/store';

export type Props = {|
  tokenSymbol: string,
  sale: SaleStore,
|};

const marker = getMarker('token-price');

const TokenPriceView = ({ tokenSymbol, sale }: Props) => {
  const { paymentMethods } = sale;

  if (sale.notLimited || !paymentMethods) {
    return null;
  }

  return (
    <Panel data-marker={marker()} className={styles.root}>
      {paymentMethods.length === 0 ? null : (
        <div className={styles.section}>
          <h3 className={styles.title}>
            <Trans>Token price</Trans>
          </h3>

          {paymentMethods.map(({ rate, label }) => (
            <p key={label} className={styles.price}>
              1 {label} ={' '}
              <Badge>
                <NumberFormat value={rate} />
              </Badge>{' '}
              {tokenSymbol}
            </p>
          ))}
        </div>
      )}

      {sale.notLimited ? null : (
        <div className={styles.section}>
          <h3 className={styles.title}>
            <Trans>Tokens sold</Trans>
          </h3>

          <Meter value={sale.data.sold / sale.data.total || 0} />

          <p className={styles.sold}>
            <NumberFormat value={sale.data.sold} /> {tokenSymbol}{' '}
            <Text color="muted">
              <Trans id="soldOf" />{' '}
              <NumberFormat>{sale.data.total}</NumberFormat>
            </Text>
          </p>
        </div>
      )}
    </Panel>
  );
};

export const TokenPrice: React.ComponentType<Props> = observer(TokenPriceView);
