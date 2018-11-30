// @flow
import * as React from 'react';
import { saveAs } from 'file-saver';
import cn from 'classnames';
import { Button, Panel } from '@daonomic/ui';
import { Heading } from '~/components/heading';
import { CreateWalletForm } from './components/form';
import textStyles from '~/components/text/text.css';
import styles from './create-wallet.css';

export type Props = {|
  isGenerated: boolean,
  generatedWallet: {|
    address: string,
    privateKey: string,
    password: string,
  |},
  encryptedWallet: string,
|};

export class CreateWalletPage extends React.Component<Props> {
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

  renderForm = () => {
    if (this.props.isGenerated) {
      return null;
    }

    return <CreateWalletForm />;
  };

  renderGeneratedWallet = () => {
    if (!this.props.isGenerated) {
      return null;
    }

    const { generatedWallet } = this.props;
    const data = [
      {
        label: 'Address',
        value: generatedWallet.address,
      },
      {
        label: 'Private key',
        value: generatedWallet.privateKey,
      },
      {
        label: 'Password',
        value: generatedWallet.password,
      },
    ];

    return (
      <div className={styles.result}>
        {data.map(({ label, value }) => (
          <p key={label} className={styles.paragraph}>
            <b>{label}</b>
            <span
              className={cn(textStyles.block, textStyles['word-break-all'])}
            >
              {value}
            </span>
          </p>
        ))}

        <div className={styles.controls}>
          <Button
            design="primary"
            tagName="a"
            download="wallet.json"
            href={`data:text/json;charset=utf-8,${encodeURIComponent(
              this.props.encryptedWallet,
            )}`}
            onClick={this.handleDownloadKeystore}
          >
            Download Keystore File
          </Button>
        </div>
      </div>
    );
  };

  render() {
    return (
      <Panel>
        <Heading tagName="h1" size="normal" className={styles.title}>
          Create New Ethereum Wallet
        </Heading>

        {this.renderForm()}
        {this.renderGeneratedWallet()}
      </Panel>
    );
  }
}
