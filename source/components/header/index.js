// @flow
import * as React from 'react';
// $FlowFixMe
import { Trans } from '@lingui/macro';
import { inject, observer } from 'mobx-react';
import cn from 'classnames';
import { Button, Panel } from '@daonomic/ui';
import { Navigation } from '~/components/navigation';
import { Burger } from '~/components/burger';
import { getRouteUrl } from '~/domains/app/router';
import { getMarker } from '~/utils/get-marker';
import styles from './header.css';

type InjectedProps = {|
  currentRouteName: string,
  onLogout: () => void,
|};

type Props = InjectedProps & {
  className?: string,
};

type State = {
  isNavigationExpanded: boolean,
};

@observer
class Header extends React.Component<Props, State> {
  state = {
    isNavigationExpanded: false,
  };

  marker = getMarker('header');

  componentDidUpdate = (prevProps: Props) => {
    this.collapseNavigationIfCurrentRouteChanged(prevProps.currentRouteName);
  };

  collapseNavigationIfCurrentRouteChanged = (prevRouteName: string) => {
    if (prevRouteName !== this.props.currentRouteName) {
      this.setState({
        isNavigationExpanded: false,
      });
    }
  };

  handleToggleNavigation = () => {
    this.setState((state) => ({
      isNavigationExpanded: !state.isNavigationExpanded,
    }));
  };

  handleClickLogout = () => {
    this.props.onLogout();
  };

  renderNavigation = () => {
    const navigationMarker = getMarker('navigation');

    const items = [
      {
        routeName: 'buyTokens',
        marker: navigationMarker('buy-tokens')(),
        content: <Trans>Buy tokens</Trans>,
      },
      {
        routeName: 'createWallet',
        marker: navigationMarker('create-wallet')(),
        content: <Trans>Create wallet</Trans>,
      },
      {
        routeName: 'referral',
        marker: navigationMarker('referral')(),
        content: <Trans>Referral</Trans>,
      },
      {
        routeName: 'faq',
        marker: navigationMarker('faq')(),
        content: <Trans>For investors</Trans>,
      },
    ];

    return (
      <Navigation data-marker={navigationMarker()}>
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
  };

  render() {
    const { className } = this.props;
    const { isNavigationExpanded } = this.state;

    return (
      <Panel data-marker={this.marker()} className={cn(className, styles.root)}>
        <div className={styles.left}>
          <Burger
            isActive={isNavigationExpanded}
            onClick={this.handleToggleNavigation}
          />
        </div>

        <div
          className={cn(styles.navigation, {
            [styles.navigation_expanded]: isNavigationExpanded,
          })}
        >
          {this.renderNavigation()}
        </div>

        <div className={styles.right}>
          <Button
            data-marker={this.marker('logout')()}
            size="m"
            design="secondary"
            onClick={this.handleClickLogout}
          >
            <Trans>Log Out</Trans>
          </Button>
        </div>
      </Panel>
    );
  }
}

export default inject(
  ({ auth, router }): InjectedProps => ({
    currentRouteName: router.currentRoute.name,
    onLogout: auth.logout,
  }),
)(Header);
