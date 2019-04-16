//@flow
import * as React from 'react';
// $FlowFixMe
import { Trans } from '@lingui/macro';
import { Button } from '@daonomic/ui';
import { generateQrCode } from '~/utils/generate-qrcode';
import { CopyToClipboard } from '~/components/copy-to-clipboard';
import { markerTreeContext } from '~/providers/marker-tree';
import { QrCode } from './components/qr-code';
import { Address } from '~/components/address';
import style from './styles.css';

type Props = {|
  paymentMethodAddress: ?string,
  paymentMethodSymbol: ?string,
|};

type State = {|
  qrCode: ?string,
|};

export class PaymentMethodAddressView extends React.PureComponent<
  Props,
  State,
> {
  state = {
    qrCode: null,
  };
  componentDidMount() {
    const { paymentMethodAddress } = this.props;

    if (!paymentMethodAddress) {
      return;
    }

    generateQrCode(paymentMethodAddress).then((qrCode) => {
      this.setState({
        qrCode,
      });
    });
  }

  componentDidUpdate(prevProps: Props) {
    const { paymentMethodAddress } = this.props;

    if (prevProps.paymentMethodAddress !== paymentMethodAddress) {
      generateQrCode(paymentMethodAddress).then((qrCode) => {
        this.setState({
          qrCode,
        });
      });
    }
  }

  render() {
    const { paymentMethodAddress, paymentMethodSymbol } = this.props;
    const address = paymentMethodAddress;

    if (!address) {
      return <Trans>Loading...</Trans>;
    }

    const { qrCode } = this.state;

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
                  <Address address={address} />
                </span>
              </span>
              <div className={style.copy}>
                <CopyToClipboard value={address}>
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
  }
}
