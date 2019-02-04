//@flow
import * as React from 'react';
// $FlowFixMe
import { Trans } from '@lingui/macro';
import { saveAs } from 'file-saver';
import { Button, Input } from '@daonomic/ui';
import { CopyToClipboard } from '~/components/copy-to-clipboard';
import styles from './styles.css';

export type Props = {|
  generatedWallet: {|
    address: string,
    privateKey: string,
    password: string,
  |},
  encryptedWallet: string,
|};

export class GeneratedWallet extends React.Component<Props> {
  handleDownloadKeystore = (event: Event) => {
    event.preventDefault();

    const { encryptedWallet } = this.props;

    saveAs(
      new Blob([encryptedWallet], {
        type: 'text/json;charset=utf-8',
      }),
      'wallet.json',
    );
  };

  renderCopyButton = (value: string) => (
    <CopyToClipboard value={value}>
      {({ state, text, copy }) => (
        <Button disabled={state !== 'initial'} size="s" onClick={copy}>
          {text}
        </Button>
      )}
    </CopyToClipboard>
  );

  render() {
    const { generatedWallet } = this.props;

    return (
      <div>
        <div className={styles.row}>
          <Input
            disabled
            label={<Trans>Address</Trans>}
            type="text"
            value={generatedWallet.address}
          />
          <div className={styles.actions}>
            {this.renderCopyButton(generatedWallet.address)}
          </div>
        </div>

        <div className={styles.row}>
          <Input
            disabled
            label={<Trans>Private key</Trans>}
            type="password"
            value={generatedWallet.privateKey}
          />
          <div className={styles.actions}>
            {this.renderCopyButton(generatedWallet.privateKey)}
          </div>
        </div>

        <div className={styles.row}>
          <Input
            disabled
            label={<Trans>Password</Trans>}
            type="password"
            value={generatedWallet.password}
          />
          <div className={styles.actions}>
            {this.renderCopyButton(generatedWallet.password)}
          </div>
        </div>

        <div className={styles.row}>
          <Button
            design="primary"
            tagName="a"
            download="wallet.json"
            href={`data:text/json;charset=utf-8,${encodeURIComponent(
              this.props.encryptedWallet,
            )}`}
            onClick={this.handleDownloadKeystore}
          >
            <Trans>Download Keystore File</Trans>
          </Button>
        </div>
      </div>
    );
  }
}
