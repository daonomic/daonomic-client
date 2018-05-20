// @flow
import * as React from 'react';
import { getTranslation } from '~/i18n';

import type { Web3CheckErrorCode } from '~/services/web3/check';
import type { EthereumNetwork } from '~/config/ethereum-network';
import { expectedEthereumNetwork } from '~/config/ethereum-network';

type Props = {
  errorCode: Web3CheckErrorCode,
  element?: string,
  renderNotAuthenticatedError?: () => React.Node,
  renderInvalidNetworkError?: (EthereumNetwork) => React.Node,
  renderMissingWeb3Error?: () => React.Node,
};

export default class Web3CheckError extends React.Component<Props> {
  renderNotAuthenticatedError = () => getTranslation('web3:noWeb3Auth');
  renderMissingWeb3Error = () => getTranslation('web3:noWeb3');
  renderInvalidNetworkError = (expectedNetwork: EthereumNetwork) =>
    getTranslation('web3:invalidEthereumNetwork', {
      networkName: expectedNetwork.name,
    });

  render() {
    let renderedError;

    switch (this.props.errorCode) {
      case 'notAuthenticated': {
        renderedError = (this.props.renderNotAuthenticatedError ||
          this.renderNotAuthenticatedError)();
        break;
      }

      case 'invalidNetwork': {
        renderedError = (this.props.renderInvalidNetworkError ||
          this.renderInvalidNetworkError)(expectedEthereumNetwork);
        break;
      }

      case 'missingWeb3': {
        renderedError = (this.props.renderMissingWeb3Error ||
          this.renderMissingWeb3Error)();
        break;
      }

      default: {
        (this.props.errorCode: empty);
      }
    }

    return React.createElement(this.props.element || 'div', {
      dangerouslySetInnerHTML: { __html: renderedError },
    });
  }
}
