// @flow
import * as React from 'react';
import { Panel } from '@daonomic/ui';
import { getTranslation } from '~/domains/app/i18n';
import { getMarker } from '~/utils/get-marker';
import { getReferralLinkForToken } from '~/modules/referral-program/utils';
import styles from './styles.css';

import * as ReferralProgramTypes from '~/modules/referral-program/types';
import * as DataStateTypes from '~/modules/data-state/types';

export type Props = {|
  userToken: DataStateTypes.LoadableData<ReferralProgramTypes.Token>,
|};

export class ReferralProgram extends React.Component<Props> {
  marker = getMarker('referral-program');

  renderError = () => getTranslation('referralProgram:linkLoadingError');

  renderPreloader = () => `${getTranslation('common:loading')}...`;

  renderLink = (userToken: ReferralProgramTypes.Token) => {
    return <p className={styles.link}>{getReferralLinkForToken(userToken)}</p>;
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
          {getTranslation('referralProgram:referralLink')}
        </h3>

        {this.renderContent()}
      </Panel>
    );
  }
}
