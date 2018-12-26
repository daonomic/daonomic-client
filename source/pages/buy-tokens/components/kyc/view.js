// @flow
import * as React from 'react';
// $FlowFixMe
import { Trans } from '@lingui/macro';
import cn from 'classnames';
import { Input, Panel, Badge } from '@daonomic/ui';
import { Title } from './title';
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

  renderVerifyIdentityTitle = () => (
    <Title>
      <Trans>Verify Your Identity</Trans>
    </Title>
  );

  renderForm = (kycData: KycTypes.State) => {
    switch (kycData.status) {
      case 'INTERNAL_KYC': {
        return <ExtendedKycForm url={kycData.url} form={kycData.form} />;
      }

      case 'EXTERNAL_KYC': {
        return (
          <React.Fragment>
            <p>
              <Trans>
                We need to verify your identity before you get access to token
                sale. Please click the link below and fill the opened form. Your
                data will be reviewed and then approved or denied.
              </Trans>
            </p>
            <p>
              <a
                data-marker={this.exteralKycMarker('link')()}
                href={kycData.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Trans>Verify identity</Trans>
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
            <Title>
              <Trans>Your Ethereum wallet</Trans>
            </Title>

            <UserDataForm
              countryRequired={kycData.countryRequired}
              onSubmit={this.props.onSubmitUserData}
            />
          </Panel>
        );
      }

      case 'DENIED': {
        return (
          <Panel>
            {this.renderVerifyIdentityTitle()}

            <p className={cn(styles.paragraph, styles.red)}>
              <Trans>
                Your data was denied. Please, fix and resubmit your data.
              </Trans>
              <br />
              {kycData.reason && <Trans>Denial reason: {kycData.reason}</Trans>}
            </p>

            {this.renderForm(kycData.childStatus)}
          </Panel>
        );
      }

      case 'INTERNAL_KYC': {
        return (
          <Panel>
            {this.renderVerifyIdentityTitle()}
            {this.renderForm(kycData)}
          </Panel>
        );
      }

      case 'EXTERNAL_KYC': {
        return (
          <Panel data-marker={this.exteralKycMarker()}>
            {this.renderVerifyIdentityTitle()}
            {this.renderForm(kycData)}
          </Panel>
        );
      }

      case 'CIVIC_KYC': {
        return (
          <Panel>
            {this.renderVerifyIdentityTitle()}
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
              <Trans>Waiting for review</Trans>
            </Badge>
            <p data-marker="kyc-review-annotation" className={styles.paragraph}>
              <Trans>
                Your data is being reviewed. Please, wait for approval.
              </Trans>
            </p>
            <Input
              disabled
              label={<Trans>Your Ethereum wallet address</Trans>}
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
              label={<Trans>Your Ethereum wallet address</Trans>}
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
