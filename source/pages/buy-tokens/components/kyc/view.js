// @flow
import * as React from 'react';
import cn from 'classnames';
import { Input, Panel, Badge } from '@daonomic/ui';

import Heading from '~/components/heading';

import styles from './styles.css';
import { getTranslation } from '~/i18n';
import UserWalletAddressForm from './user-wallet-address-form';
import ExtendedKycForm from './extended-kyc-form';

export type Props = {|
  userWalletAddress: ?string,
  isKycExtended: boolean,
  isAllowed: boolean,
  isDenied: boolean,
  isOnReview: boolean,
  denialReason: string,
|};

export default class KycView extends React.Component<Props> {
  renderTitle = () => {
    let titleTranslationKey = 'kyc:title';

    if (this.props.isKycExtended && !this.props.userWalletAddress) {
      titleTranslationKey = 'kyc:extendedKycFirstStepTitle';
    } else if (this.props.isKycExtended && this.props.userWalletAddress) {
      titleTranslationKey = 'kyc:extendedKycSecondStepTitle';
    }

    return (
      <Heading className={styles.title} tagName="h2" size="normal">
        {getTranslation(titleTranslationKey)}
      </Heading>
    );
  };

  renderStatus = () => {
    const { isOnReview, isDenied, denialReason } = this.props;

    if (isDenied) {
      return (
        <p className={cn(styles.paragraph, styles.red)}>
          {getTranslation('kyc:denied')}
          <br />
          {denialReason &&
            getTranslation('kyc:denialReason', { reason: denialReason })}
        </p>
      );
    } else if (isOnReview) {
      return (
        <p className={styles.paragraph}>{getTranslation('kyc:onReview')}</p>
      );
    }
  };

  renderStatusBadge = () => {
    if (this.props.isOnReview) {
      return (
        <Badge color="danger">{getTranslation('kyc:waitingForReview')}</Badge>
      );
    }

    return null;
  };

  renderForm = () => {
    if (this.props.userWalletAddress && this.props.isKycExtended) {
      return <ExtendedKycForm />;
    }

    return <UserWalletAddressForm />;
  };

  render() {
    if (this.props.isOnReview || this.props.isAllowed) {
      return (
        <Panel>
          {this.renderStatusBadge()}
          {this.renderStatus()}
          <Input
            disabled
            label={getTranslation('kyc:yourEthereumWalletAddress')}
            value={this.props.userWalletAddress}
            onChange={() => {}}
          />
        </Panel>
      );
    }

    return (
      <Panel>
        {this.renderTitle()}
        {this.renderStatus()}
        {this.renderForm()}
      </Panel>
    );
  }
}
