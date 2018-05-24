// @flow
import * as React from 'react';
import { observable, action, runInAction } from 'mobx';
import { observer, inject } from 'mobx-react';
import UserWalletAddressFormView from './view';

import type { KycStore } from '~/stores/kyc';

type Props = {|
  initialAddress?: ?string,
  onSubmit({ address: string }): Promise<mixed>,
|};

class UserWalletAddressFormContainer extends React.Component<Props> {
  @observable isSaving = false;

  @action
  handleSubmit = async ({ address }: { address: string }) => {
    this.isSaving = true;

    await this.props.onSubmit({ address });

    runInAction(() => {
      this.isSaving = false;
    });
  };

  render() {
    return (
      <UserWalletAddressFormView
        isDisabled={this.isSaving}
        initialAddress={this.props.initialAddress}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

const ObservingUserWalletAddressFormContainer = observer(
  UserWalletAddressFormContainer,
);

export default inject(({ kyc }: { kyc: KycStore }): Props => ({
  initialAddress: kyc.state.userWalletAddress,
  onSubmit: kyc.saveUserWalletAddress,
}))(ObservingUserWalletAddressFormContainer);
