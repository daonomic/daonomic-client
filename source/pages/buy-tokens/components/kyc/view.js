// @flow
import * as React from 'react';
import cn from 'classnames';
import { Input, Panel, Badge } from '@daonomic/ui';
import Heading from '~/components/heading';
import UserDataForm from './user-data-form';
import ExtendedKycForm from './extended-kyc-form';
import styles from './styles.css';
import { getTranslation } from '~/i18n';
import getMarker from '~/utils/get-marker';

import type { State as KycState } from '~/modules/kyc/types';

export type Props = {|
  kycState: KycState,
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

    switch (kycState.status) {
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
              {kycState.reason &&
                getTranslation('kyc:denialReason', { reason: kycState.reason })}
            </p>
            <ExtendedKycForm
              url={kycState.url}
              fields={kycState.fields}
              initialFormData={kycState.data}
            />
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
        const marker = getMarker('external-kyc');

        return (
          <Panel data-marker={marker()}>
            {this.renderTitle('kyc:verifyYourIdentity')}
            <p>{getTranslation('kyc:externalAnnotation')}</p>
            <p>
              <a
                data-marker={marker('link')()}
                href={kycState.url}
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
        (kycState.status: empty);
      }
    }
  }
}
