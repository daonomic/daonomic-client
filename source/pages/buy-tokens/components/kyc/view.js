// @flow
import * as React from 'react';
import cn from 'classnames';
import { Input, Panel, Badge } from '@daonomic/ui';
import { Heading } from '~/components/heading';
import { getTranslation } from '~/i18n';
import { getMarker } from '~/utils/get-marker';
import { UserDataForm } from './user-data-form';
import { ExtendedKycForm } from './extended-kyc-form';
import { CivicKycForm } from './civic-kyc-form';
import styles from './styles.css';

import type { LoadableData } from '~/modules/data-state/types';
import * as KycTypes from '~/modules/kyc/types';

export type Props = {|
  kycState: LoadableData<KycTypes.State>,
  userWalletAddress: ?string,
  onSubmitUserData(): mixed,
|};

export default class KycView extends React.Component<Props> {
  exteralKycMarker = getMarker('external-kyc');

  renderTitle = (translationKey: string) => (
    <Heading className={styles.title} tagName="h2" size="normal">
      {getTranslation(translationKey)}
    </Heading>
  );

  renderForm = (kycData: KycTypes.State) => {
    switch (kycData.status) {
      case 'INTERNAL_KYC': {
        return <ExtendedKycForm url={kycData.url} form={kycData.form} />;
      }

      case 'EXTERNAL_KYC': {
        return (
          <React.Fragment>
            <p>{getTranslation('kyc:externalAnnotation')}</p>
            <p>
              <a
                data-marker={this.exteralKycMarker('link')()}
                href={kycData.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {getTranslation('kyc:verifyIdentity')}
              </a>
            </p>
          </React.Fragment>
        );
      }

      default: {
        return null;
      }
    }
  };

  render() {
    const { kycState } = this.props;

    if (kycState.dataState !== 'loaded') {
      return null;
    }

    const kycData = kycState.data;

    switch (kycData.status) {
      case 'NOT_SET': {
        return (
          <Panel>
            {this.renderTitle('kyc:userDataTitle')}
            <UserDataForm onSubmit={this.props.onSubmitUserData} />
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
              {kycData.reason &&
                getTranslation('kyc:denialReason', {
                  reason: kycData.reason,
                })}
            </p>

            {this.renderForm(kycData.childStatus)}
          </Panel>
        );
      }

      case 'INTERNAL_KYC': {
        return (
          <Panel>
            {this.renderTitle('kyc:verifyYourIdentity')}
            {this.renderForm(kycData)}
          </Panel>
        );
      }

      case 'EXTERNAL_KYC': {
        return (
          <Panel data-marker={this.exteralKycMarker()}>
            {this.renderTitle('kyc:verifyYourIdentity')}
            {this.renderForm(kycData)}
          </Panel>
        );
      }

      case 'CIVIC_KYC': {
        return (
          <Panel>
            {this.renderTitle('kyc:verifyYourIdentity')}
            <CivicKycForm
              action={kycData.url}
              applicationId={kycData.applicationId}
            />
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
        (kycData.status: empty);
        return null;
      }
    }
  }
}
