// @flow
import * as React from 'react';
// $FlowFixMe
import { Trans } from '@lingui/macro';
import { Input, Button } from '@daonomic/ui';
import { getMarker } from '~/utils/get-marker';
import { referralProgramService } from '~/domains/business/referral-program';
import { CopyToClipboard } from '~/components/copy-to-clipboard';
import styles from './styles.css';

import * as ReferralProgramTypes from '~/domains/business/referral-program/types';
import * as DataStateTypes from '~/modules/data-state/types';

export type Props = {|
  userData: DataStateTypes.LoadableData<ReferralProgramTypes.UserData>,
|};

export class ReferralLink extends React.Component<Props> {
  marker = getMarker('referral-link');

  renderError = () => <Trans>Failed to load referral link</Trans>;

  renderPreloader = () => <Trans>Loading...</Trans>;

  renderLink = (userData: ReferralProgramTypes.UserData) => {
    const link = referralProgramService.getReferralLinkForToken(userData.token);

    return (
      <p data-marker={this.marker()} className={styles.link}>
        <Input readOnly className={styles.input} value={link} />

        <CopyToClipboard value={link}>
          {({ state, text, copy }) => (
            <Button
              className={styles.button}
              disabled={state !== 'initial'}
              size="m"
              onClick={copy}
            >
              {text}
            </Button>
          )}
        </CopyToClipboard>
      </p>
    );
  };

  render() {
    switch (this.props.userData.dataState) {
      case 'initial': {
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
        return null;
      }
    }
  }
}
