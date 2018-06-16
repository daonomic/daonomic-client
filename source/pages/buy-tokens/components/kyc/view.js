// @flow
import * as React from 'react';
import cn from 'classnames';
import { Input, Panel, Badge } from '@daonomic/ui';
import Heading from '~/components/heading';
import UserDataForm from './user-data-form';
import ExtendedKycForm from './extended-kyc-form';
import styles from './styles.css';
import { getTranslation } from '~/i18n';
import { loadAndSetKycState } from '~/modules/kyc/actions';

import type { State as KycState } from '~/modules/kyc/types';

export type Props = {|
  kycState: KycState,
  userWalletAddress: ?string,
|};

export default class KycView extends React.Component<Props> {
  renderTitle = () => {
    let titleTranslationKey = 'kyc:title';

    // if (this.props.isKycExtended && !this.props.userWalletAddress) {
    //   titleTranslationKey = 'kyc:extendedKycFirstStepTitle';
    // } else if (this.props.isKycExtended && this.props.userWalletAddress) {
    //   titleTranslationKey = 'kyc:extendedKycSecondStepTitle';
    // }

    return (
      <Heading className={styles.title} tagName="h2" size="normal">
        {getTranslation(titleTranslationKey)}
      </Heading>
    );
  };

  renderStatus = () => {
    if (this.props.kycState.status === 'DENIED') {
      const { reason } = this.props.kycState;

      return (
        <p className={cn(styles.paragraph, styles.red)}>
          {getTranslation('kyc:denied')}
          <br />
          {reason && getTranslation('kyc:denialReason', { reason })}
        </p>
      );
    } else if (this.props.kycState.status === 'ON_REVIEW') {
      return (
        <p data-marker="kyc-review-annotation" className={styles.paragraph}>
          {getTranslation('kyc:onReview')}
        </p>
      );
    }
  };

  renderStatusBadge = () => {
    if (this.props.kycState.status === 'ON_REVIEW') {
      return (
        <Badge color="danger">{getTranslation('kyc:waitingForReview')}</Badge>
      );
    }

    return null;
  };

  render() {
    const { status } = this.props.kycState;

    switch (status) {
      case 'NOT_SET': {
        return (
          <Panel>
            {this.renderTitle()}
            <UserDataForm onSubmit={loadAndSetKycState} />
          </Panel>
        );
      }

      case 'INTERNAL_KYC':
      case 'DENIED': {
        return (
          <Panel>
            {this.renderTitle()}
            {this.renderStatus()}
            <ExtendedKycForm />
          </Panel>
        );
      }

      case 'EXTERNAL_KYC': {
        return <Panel>external kyc</Panel>;
      }

      case 'ON_REVIEW':
      case 'ALLOWED': {
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

      default: {
        (status: empty);
      }
    }
  }
}
