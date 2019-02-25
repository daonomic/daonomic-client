//@flow
import * as React from 'react';
// $FlowFixMe
import { Trans } from '@lingui/macro';
import { Button } from '@daonomic/ui';
import { CopyToClipboard } from '~/components/copy-to-clipboard';
import { getMarker } from '~/utils/get-marker';
import { QrCode } from './qr-code';
import styles from './styles.css';

import * as PaymentMethodTypes from '~/domains/business/payment-method/types';

export type Props = {|
  selectedPaymentMethod: ?PaymentMethodTypes.Data,
  selectedPaymentMethodAddress: ?string,
|};

export class PaymentMethodAddress extends React.Component<Props> {
  marker = getMarker('payment-method-address');

  render() {
    const { selectedPaymentMethod, selectedPaymentMethodAddress } = this.props;

    if (!selectedPaymentMethod || !selectedPaymentMethodAddress) {
      return (
        <div>
          <Trans>Loading...</Trans>
        </div>
      );
    }

    if (selectedPaymentMethod.id === 'ERC20') {
      return null;
    }

    return (
      <div className={styles.root} data-marker={this.marker()}>
        <QrCode data-marker={this.marker('qr')()} />
        <div className={styles.text}>
          <Trans>
            Send funds to this {selectedPaymentMethod.label} address:
          </Trans>
          <div className={styles.address}>{selectedPaymentMethodAddress}</div>
          <CopyToClipboard value={selectedPaymentMethodAddress}>
            {({ state, text, copy }) => (
              <Button disabled={state !== 'idle'} size="s" onClick={copy}>
                {text}
              </Button>
            )}
          </CopyToClipboard>
        </div>
      </div>
    );
  }
}
