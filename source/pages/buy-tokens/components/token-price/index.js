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

  if (!paymentMethods) {
    return null;
  }

  return (
    <Panel data-marker={marker()} className={styles.root}>
      <div className={styles.section}>
        <h3 className={styles.title}>
          <Trans>Token price</Trans>
        </h3>

        <ul className={styles.list}>
          {paymentMethods
            .filter(
              (paymentMethods) => paymentMethods.category !== 'KYBER_NETWORK',
            )
            .map((method) => (
              <li key={method.id} className={styles.price}>
                1 {method.id} ={' '}
                <Badge>
                  <NumberFormat value={method.rate} />
                </Badge>{' '}
                {tokenSymbol}
              </li>
            ))}
        </ul>
      </div>

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
