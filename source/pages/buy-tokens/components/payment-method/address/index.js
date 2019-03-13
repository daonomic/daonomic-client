//@flow
import * as React from 'react';
// $FlowFixMe
import { Trans } from '@lingui/macro';
import { observer } from 'mobx-react';
import { Button } from '@daonomic/ui';
import { CopyToClipboard } from '~/components/copy-to-clipboard';
import { getMarker } from '~/utils/get-marker';
import { QrCode } from './qr-code';
import { Address } from '~/components/address';
import styles from './styles.css';

import { SaleStore } from '~/domains/business/sale/store';

type Props = {|
  sale: SaleStore,
|};

const marker = getMarker('payment-method-address');

function PaymentMethodAddressView({ sale }: Props) {
  const { selectedMethod, selectedMethodAddress } = sale.payment;

  if (!selectedMethod || !selectedMethodAddress) {
    return (
      <div>
        <Trans>Loading...</Trans>
      </div>
    );
  }

  if (selectedMethod.id === 'ERC20') {
    return null;
  }

  return (
    <div className={styles.root} data-marker={marker()}>
      <QrCode
        data-marker={marker('qr')()}
        qrCodeUrl={sale.payment.state.selectedMethodAddressQRCode}
      />

      <div className={styles.text}>
        <Trans>Send funds to this {selectedMethod.label} address:</Trans>{' '}
        <Address address={selectedMethodAddress} />
        <div className={styles.copy}>
          <CopyToClipboard value={selectedMethodAddress}>
            {({ state, text, copy }) => (
              <Button disabled={state !== 'idle'} size="s" onClick={copy}>
                {text}
              </Button>
            )}
          </CopyToClipboard>
        </div>
      </div>
    </div>
  );
}

export const PaymentMethodAddress: React.ComponentType<Props> = observer(
  PaymentMethodAddressView,
);
