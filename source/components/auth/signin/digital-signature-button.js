// @flow
import * as React from 'react';
import { Button } from '@daonomic/ui';
import Web3 from '~/components/web3';
import { getTranslation } from '~/i18n';

type Props = {
  onClick?: Function,
};

export default class DigitalSignatureButton extends React.Component<Props> {
  renderNotAuthenticatedError = () => getTranslation('auth:metamaskAuthFail');
  renderMissingWeb3Error = () => getTranslation('auth:noWeb3');

  render() {
    const { onClick, ...restProps } = this.props;

    return (
      <Web3
        renderNotAuthenticatedError={this.renderNotAuthenticatedError}
        renderMissingWeb3Error={this.renderMissingWeb3Error}
      >
        <Button {...restProps} design="secondary" onClick={onClick}>
          {getTranslation('auth:signInWithDigitalSignature')}
        </Button>
      </Web3>
    );
  }
}
