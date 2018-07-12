// @flow
import * as React from 'react';
import cn from 'classnames';
import { Input, Panel, Badge } from '@daonomic/ui';
import { Heading } from '~/components/heading';
import UserDataForm from './user-data-form';
import ExtendedKycForm from './extended-kyc-form';
import styles from './styles.css';
import { getTranslation } from '~/i18n';
import { getMarker } from '~/utils/get-marker';

import type { LoadableData } from '~/modules/data-state/types';
import * as KycTypes from '~/modules/kyc/types';

export type Props = {|
  kycState: LoadableData<KycTypes.State>,
  userWalletAddress: ?string,
  onSubmitUserData(): mixed,
|};

export default class KycView extends React.Component<Props> {
  renderTitle = (translationKey: string) => (
    <Heading className={styles.title} tagName="h2" size="normal">
      {getTranslation(translationKey)}
    </Heading>
  );

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
            <ExtendedKycForm url={kycData.url} form={kycData.form} />
          </Panel>
        );
      }

      case 'INTERNAL_KYC': {
        return (
          <Panel>
            {this.renderTitle('kyc:verifyYourIdentity')}
            <ExtendedKycForm url={kycData.url} form={kycData.form} />
          </Panel>
        );
      }

      case 'EXTERNAL_KYC': {
        const marker = getMarker('external-kyc');

        return (
          <Panel data-marker={marker()}>
            {this.renderTitle('kyc:verifyYourIdentity')}
            <p>{getTranslation('kyc:externalAnnotation')}</p>
            <p>
              <a
                data-marker={marker('link')()}
                href={kycData.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {getTranslation('kyc:verifyIdentity')}
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
        (kycData.status: empty);
      }
    }
  }
}
