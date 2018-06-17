// @flow
import * as React from 'react';
import cn from 'classnames';
import { Input, Panel, Badge, Button } from '@daonomic/ui';
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
  renderTitle = (translationKey: string) => (
    <Heading className={styles.title} tagName="h2" size="normal">
      {getTranslation(translationKey)}
    </Heading>
  );

  render() {
    const { kycState } = this.props;

    switch (kycState.status) {
      case 'NOT_SET': {
        return (
          <Panel>
            {this.renderTitle('kyc:userDataTitle')}
            <UserDataForm onSubmit={loadAndSetKycState} />
          </Panel>
        );
      }

      case 'DENIED': {
        return (
          <Panel>
            {this.renderTitle('kyc:verifyYourIdentity')}
            <p className={cn(styles.paragraph, styles.red)}>
              {getTranslation('kyc:denied')}
              <br />
              {kycState.reason &&
                getTranslation('kyc:denialReason', { reason: kycState.reason })}
            </p>
            <ExtendedKycForm url={kycState.url} fields={kycState.fields} />
          </Panel>
        );
      }

      case 'INTERNAL_KYC': {
        return (
          <Panel>
            {this.renderTitle('kyc:verifyYourIdentity')}
            <ExtendedKycForm url={kycState.url} fields={kycState.fields} />
          </Panel>
        );
      }

      case 'EXTERNAL_KYC': {
        return (
          <Panel>
            {this.renderTitle('kyc:verifyYourIdentity')}
            <p>
              We need to verify your identity before you get access to token
              sale. Please click the link below and fill the opened form. Your
              data will be reviewed and then approved or denied.
            </p>
            <p>
              <a href={kycState.url} target="_blank" rel="noopener noreferrer">
                Verify identity
              </a>
            </p>
          </Panel>
        );
      }

      case 'ON_REVIEW': {
        return (
          <Panel>
            <Badge color="danger">
              {getTranslation('kyc:waitingForReview')}
            </Badge>
            <p data-marker="kyc-review-annotation" className={styles.paragraph}>
              {getTranslation('kyc:onReview')}
            </p>
            <Input
              disabled
              label={getTranslation('kyc:yourEthereumWalletAddress')}
              value={this.props.userWalletAddress}
              onChange={() => {}}
            />
          </Panel>
        );
      }

      case 'ALLOWED': {
        return (
          <Panel>
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
        (kycState.status: empty);
      }
    }
  }
}
