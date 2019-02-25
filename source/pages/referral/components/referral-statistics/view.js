// @flow
import * as React from 'react';
// $FlowFixMe
import { Trans, NumberFormat } from '@lingui/macro';
import { getMarker } from '~/utils/get-marker';
import style from './style.css';

import * as ReferralProgramTypes from '~/domains/business/referral-program/types';
import * as DataStateTypes from '~/domains/data/data-state/types';

export type Props = {|
  userData: DataStateTypes.LoadableData<ReferralProgramTypes.UserData>,
|};

export class ReferralStatistics extends React.Component<Props> {
  marker = getMarker('referral-statistics');

  renderError = () => <Trans>Failed to load referral statistics</Trans>;

  renderPreloader = () => <Trans>Loading...</Trans>;

  renderStatistics = (userData: ReferralProgramTypes.UserData) => {
    const { statistics } = userData;

    return (
      <ul data-marker={this.marker()} className={style.root}>
        <li className={style.item}>
          <span className={style.name}>
            <Trans>Referees count</Trans>
          </span>
          <span
            data-marker={this.marker('users')()}
            className={style.count}
            title={statistics.users}
          >
            <NumberFormat value={statistics.users} />
          </span>
        </li>

        <li className={style.item}>
          <span className={style.name}>
            <Trans>Bought</Trans>
          </span>
          <span
            data-marker={this.marker('sold')()}
            className={style.count}
            title={statistics.sold}
          >
            <NumberFormat value={statistics.sold} />
          </span>
        </li>

        <li className={style.item}>
          <span className={style.name}>
            <Trans>Bonus</Trans>
          </span>
          <span
            data-marker={this.marker('bonus')()}
            className={style.count}
            title={statistics.bonus}
          >
            <NumberFormat value={statistics.bonus} />
          </span>
        </li>
      </ul>
    );
  };

  render() {
    switch (this.props.userData.dataState) {
      case 'idle': {
        return this.renderError();
      }

      case 'loading': {
        return this.renderPreloader();
      }

      case 'loaded': {
        return this.renderStatistics(this.props.userData.data);
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
