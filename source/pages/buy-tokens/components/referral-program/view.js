// @flow
import * as React from 'react';
// $FlowFixMe
import { Trans } from '@lingui/macro';
import { Panel } from '@daonomic/ui';
import { getMarker } from '~/utils/get-marker';
import { referralProgramService } from '~/domains/business/referral-program';
import styles from './styles.css';

import * as ReferralProgramTypes from '~/domains/business/referral-program/types';
import * as DataStateTypes from '~/domains/data/data-state/types';

export type Props = {|
  isReferralAvailable: boolean,
  userData: DataStateTypes.LoadableData<ReferralProgramTypes.UserData>,
|};

export class ReferralProgram extends React.Component<Props> {
  marker = getMarker('referral-program');

  renderError = () => <Trans>Failed to load referral link</Trans>;

  renderPreloader = () => <Trans>Loading...</Trans>;

  renderLink = (userData: ReferralProgramTypes.UserData) => {
    return (
      <p className={styles.link}>
        {referralProgramService.getReferralLinkForToken(userData.token)}
      </p>
    );
  };

  renderContent = () => {
    switch (this.props.userData.dataState) {
      case 'idle': {
        return this.renderError();
      }

      case 'loading': {
        return this.renderPreloader();
      }

      case 'loaded': {
        return this.renderLink(this.props.userData.data);
      }

      case 'failed': {
        return this.renderError();
      }

      default: {
        (this.props.userData.dataState: empty);
      }
    }
  };

  render() {
    if (!this.props.isReferralAvailable) {
      return null;
    }

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
