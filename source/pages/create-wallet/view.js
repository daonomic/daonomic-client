// @flow
import * as React from 'react';
import { Panel } from '@daonomic/ui';
import { Heading } from '~/components/heading';
import { CreateWalletForm } from './components/form';
import { GeneratedWallet } from './components/generated-wallet';
import styles from './create-wallet.css';

export type Props = {|
  isGenerated: boolean,
|};

export class CreateWalletPage extends React.Component<Props> {
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

    return <GeneratedWallet />;
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
