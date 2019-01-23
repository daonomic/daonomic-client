// @flow
import * as React from 'react';
// $FlowFixMe
import { Trans } from '@lingui/macro';
import { Panel } from '@daonomic/ui';
import { getMarker } from '~/utils/get-marker';
import { referralProgramService } from '~/domains/business/referral-program';
import styles from './styles.css';

import * as ReferralProgramTypes from '~/domains/business/referral-program/types';
import * as DataStateTypes from '~/modules/data-state/types';

export type Props = {|
  userToken: DataStateTypes.LoadableData<ReferralProgramTypes.Token>,
|};

export class ReferralProgram extends React.Component<Props> {
  marker = getMarker('referral-program');

  renderError = () => <Trans>Failed to load referral link</Trans>;

  renderPreloader = () => <Trans>Loading...</Trans>;

  renderLink = (userToken: ReferralProgramTypes.Token) => {
    return (
      <p className={styles.link}>
        {referralProgramService.getReferralLinkForToken(userToken)}
      </p>
    );
  };

  renderContent = () => {
    switch (this.props.userToken.dataState) {
      case 'initial': {
        return this.renderError();
      }

      case 'loading': {
        return this.renderPreloader();
      }

      case 'loaded': {
        return this.renderLink(this.props.userToken.data);
      }

      case 'failed': {
        return this.renderError();
      }

      default: {
        (this.props.userToken.dataState: empty);
      }
    }
  };

  render() {
    return (
      <Panel data-marker={this.marker()} className={styles.root}>
        <h3 className={styles.title}>
          <Trans>Referral link</Trans>
        </h3>

        {this.renderContent()}
      </Panel>
    );
  }
}
