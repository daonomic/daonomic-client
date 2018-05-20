// @flow
import * as React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { fromPromise } from 'mobx-utils';
import { checkWeb3 } from '~/services/web3/check';
import { getTranslation } from '~/i18n';
import Web3CheckError from '~/components/web3/web3-check-error';

import type { Web3CheckResult } from '~/services/web3/check';
import type { EthereumNetwork } from '~/config/ethereum-network';

type Props = {
  children: React.Node,
  renderLoading?: () => React.Node,
  renderNotAuthenticatedError?: () => React.Node,
  renderInvalidNetworkError?: (EthereumNetwork) => React.Node,
  renderMissingWeb3Error?: () => React.Node,
};

class Web3 extends React.Component<Props> {
  @observable web3CheckPromise = fromPromise(checkWeb3());

  renderLoading = () => `${getTranslation('common:loading')}...`;

  render() {
    if (this.web3CheckPromise.state === 'pending') {
      return (
        <p
          dangerouslySetInnerHTML={{
            __html: (this.props.renderLoading || this.renderLoading)(),
          }}
        />
      );
    }

    const web3CheckResult: Web3CheckResult = this.web3CheckPromise.value;

    if (web3CheckResult.success) {
      return this.props.children;
    }

    return (
      <Web3CheckError
        errorCode={web3CheckResult.errorCode}
        renderNotAuthenticatedError={this.props.renderNotAuthenticatedError}
        renderInvalidNetworkError={this.props.renderInvalidNetworkError}
        renderMissingWeb3Error={this.props.renderMissingWeb3Error}
      />
    );
  }
}

export default observer(Web3);
