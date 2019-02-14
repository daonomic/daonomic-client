//@flow
import * as React from 'react';
// $FlowFixMe
import { Trans } from '@lingui/macro';
import { Navigation } from '~/components/navigation';
import { getRouteUrl } from '~/domains/app/router';
import { getMarker } from '~/utils/get-marker';

export type Props = {|
  currentRouteName: string,
  isReferralSupported: boolean,
  isKycNotSet: boolean,
|};

export class HeaderNavigation extends React.Component<Props> {
  marker = getMarker('navigation');

  render() {
    const items = [
      {
        routeName: 'buyTokens',
        marker: this.marker('buy-tokens')(),
        content: <Trans>Buy tokens</Trans>,
      },
    ];

    if (this.props.isKycNotSet) {
      items.push({
        routeName: 'createWallet',
        marker: this.marker('create-wallet')(),
        content: <Trans>Create wallet</Trans>,
      });
    }

    if (this.props.isReferralSupported) {
      items.push({
        routeName: 'referral',
        marker: this.marker('referral')(),
        content: <Trans>Referral</Trans>,
      });
    }

    items.push({
      routeName: 'faq',
      marker: this.marker('faq')(),
      content: <Trans>For investors</Trans>,
    });

    return (
      <Navigation data-marker={this.marker()}>
        {items.map(({ routeName, marker, content }) => (
          <Navigation.Item
            key={routeName}
            data-marker={marker}
            isActive={routeName === this.props.currentRouteName}
            href={getRouteUrl(routeName)}
          >
            {content}
          </Navigation.Item>
        ))}
      </Navigation>
    );
  }
}
