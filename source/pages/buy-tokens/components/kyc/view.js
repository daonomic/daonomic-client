// @flow
import * as React from 'react';
// $FlowFixMe
import { Trans } from '@lingui/macro';
import cn from 'classnames';
import { Spinner, Input, Panel, Badge } from '@daonomic/ui';
import { Title } from './title';
import { getMarker } from '~/utils/get-marker';
import { UserDataForm } from './user-data-form';
import { ExtendedKycForm } from './extended-kyc-form';
import { CivicKycForm } from './civic-kyc-form';
import { SumsubKycForm } from './sumsub-kyc-form';
import styles from './styles.css';

import * as DataStateTypes from '~/domains/data/data-state/types';
import * as KycTypes from '~/domains/business/kyc/types';

export type Props = {|
  kycState: DataStateTypes.LoadableData<KycTypes.State>,
  userWalletAddress: ?string,
  onSubmitUserData(): Promise<mixed>,
|};

function VerifyIdentityTitle(props) {
  return (
    <Title {...props}>
      <Trans>Verify Your Identity</Trans>
    </Title>
  );
}

export class KycView extends React.Component<Props> {
  marker = getMarker('kyc');
  exteralKycMarker = getMarker('external-kyc');

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

  renderContent = (state: KycTypes.State, reason?: string) => {
    const { kycState } = this.props;

    if (kycState.dataState !== 'loaded') return null;

    switch (state.status) {
      case 'NOT_SET': {
        if (typeof state.countryRequired === 'undefined') return null;
        return (
          <Panel>
            <Title sub={reason}>
              <Trans>Your Ethereum wallet</Trans>
            </Title>

            <UserDataForm
              countryRequired={state.countryRequired}
              onSubmit={this.props.onSubmitUserData}
            />
          </Panel>
        );
      }

      case 'DENIED': {
        if (state.childStatus) {
          return this.renderContent(
            state.childStatus,
            state.childStatus.reason,
          );
        }
        return (
          <Panel>
            <VerifyIdentityTitle sub={reason} />

            <p
              data-marker={this.marker('denial-annotation')()}
              className={cn(styles.error)}
            >
              <Trans>Sorry, your data was denied.</Trans> <br />
              {state.reason && <Trans>Denial reason: {state.reason}</Trans>}
            </p>
          </Panel>
        );
      }

      case 'INTERNAL_KYC': {
        return (
          <Panel>
            <VerifyIdentityTitle sub={reason} />
            {this.renderForm(state)}
          </Panel>
        );
      }

      case 'EXTERNAL_KYC': {
        return (
          <Panel data-marker={this.exteralKycMarker()}>
            <VerifyIdentityTitle sub={reason} />
            {this.renderForm(state)}
          </Panel>
        );
      }

      case 'CIVIC_KYC': {
        return (
          <Panel>
            <VerifyIdentityTitle sub={reason} />
            <CivicKycForm
              action={state.url}
              applicationId={state.applicationId}
            />
          </Panel>
        );
      }

      case 'SUM_SUB_KYC': {
        return (
          <Panel>
            <VerifyIdentityTitle sub={reason} />
            <SumsubKycForm configuration={state.config} />
          </Panel>
        );
      }

      case 'ON_REVIEW': {
        return (
          <Panel>
            <Badge color="danger">
              <Trans>Waiting for review</Trans>
            </Badge>
            <p
              data-marker={this.marker('review-annotation')()}
              className={styles.paragraph}
            >
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

      case 'PROCESSING': {
        return (
          <Panel>
            <div data-marker="kyc-processing" className={styles.processing}>
              <Spinner />
              <p className={styles['processing-annotation']}>
                <Trans>
                  Congrats! Your data is approved and now being processed.
                  Please wait a bit, usually it takes 1-2 minutes.
                </Trans>
              </p>
            </div>
          </Panel>
        );
      }

      case 'ALLOWED': {
        return (
          <Panel data-marker={this.marker('allowed-annotation')()}>
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
        (state.status: empty);
        return null;
      }
    }
  };

  render() {
    const { kycState } = this.props;

    if (kycState.dataState !== 'loaded') return null;

    return this.renderContent(kycState.data);
  }
}
