//@flow
import * as React from 'react';
// $FlowFixMe
import { Trans } from '@lingui/macro';
import { Button } from '@daonomic/ui';
import { CopyToClipboard } from '~/components/copy-to-clipboard';
import { markerTreeContext } from '~/providers/marker-tree';
import { QrCode } from './components/qr-code';
import { Address } from '~/components/address';
import style from './styles.css';

type Props = {|
  paymentMethodAddress: ?string,
  paymentMethodSymbol: ?string,
  qrCode: ?string,
  fundAddress: ?string,
  isHydrating: boolean,
  error: ?Error,
|};

export const PaymentMethodAddressView = (props: Props) => {
  const {
    error,
    paymentMethodSymbol,
    isHydrating,
    qrCode,
    fundAddress,
  } = props;

  if (error) {
    return (
      <Trans>An error occured: {error.message || 'Unexpected error'}</Trans>
    );
  }

  if (!fundAddress || isHydrating || !qrCode) {
    return <Trans>Loading...</Trans>;
  }

  return (
    <markerTreeContext.Consumer>
      {({ markerCreator }) => (
        <div className={style.root} data-marker={markerCreator()}>
          {qrCode && (
            <QrCode data-marker={markerCreator('qr')()} qrCodeUrl={qrCode} />
          )}
          <div className={style.text}>
            <span>
              <Trans>
                You can purchase tokens via direct transfer to wallet. Send
                funds to this <b>{paymentMethodSymbol}</b> address:
              </Trans>{' '}
              <span className={style.address}>
                <Address address={fundAddress} />
              </span>
            </span>
            <div className={style.copy}>
              <CopyToClipboard value={fundAddress}>
                {({ state, copy }) => (
                  <Button disabled={state !== 'idle'} size="s" onClick={copy}>
                    Copy {paymentMethodSymbol} address
                  </Button>
                )}
              </CopyToClipboard>
            </div>
          </div>
        </div>
      )}
    </markerTreeContext.Consumer>
  );
};
