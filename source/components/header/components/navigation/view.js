//@flow
import * as React from 'react';
// $FlowFixMe
import { Trans } from '@lingui/macro';
import { Navigation } from '~/components/navigation';
import { getRouteUrl } from '~/domains/app/router';

export type Props = {|
  marker: Function,
  currentRouteName: string,
  isReferralSupported: boolean,
|};

export class HeaderNavigation extends React.Component<Props> {
  render() {
    const items = [
      {
        routeName: 'buyTokens',
        marker: this.props.marker('buy-tokens')(),
        content: <Trans>Buy tokens</Trans>,
      },
      {
        routeName: 'createWallet',
        marker: this.props.marker('create-wallet')(),
        content: <Trans>Create wallet</Trans>,
      },
    ];

    if (this.props.isReferralSupported) {
      items.push({
        routeName: 'referral',
        marker: this.props.marker('referral')(),
        content: <Trans>Referral</Trans>,
      });
    }

    items.push({
      routeName: 'faq',
      marker: this.props.marker('faq')(),
      content: <Trans>For investors</Trans>,
    });

    return (
      <Navigation data-marker={this.props.marker()}>
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
