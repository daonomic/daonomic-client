// @flow
import * as React from 'react';
import { inject, observer } from 'mobx-react';
import cn from 'classnames';
import { Button, Panel } from '@daonomic/ui';
import Translation from '~/components/translation';
import Navigation from '~/components/navigation';
import Burger from '~/components/burger';
import pages from '~/pages';
import styles from './header.css';

type Props = {
  className?: string,
  currentPagePath: string,
  onChangeCurrentPage: (url: string) => void,
  onLogout: () => void,
};

type State = {
  isNavigationExpanded: boolean,
};

@observer
class Header extends React.Component<Props, State> {
  state = {
    isNavigationExpanded: false,
  };

  componentDidUpdate = (prevProps: Props) => {
    this.collapseNavigationIfCurrentPageChanged(prevProps.currentPagePath);
  };

  collapseNavigationIfCurrentPageChanged = (prevPagePath: string) => {
    const { currentPagePath } = this.props;

    if (prevPagePath !== currentPagePath) {
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
    const { currentPagePath, onChangeCurrentPage } = this.props;

    return (
      <Navigation>
        {[pages.app.buyTokens, pages.app.createWallet, pages.app.faq].map(
          (page) => (
            <Navigation.Item
              key={page.getPath()}
              isActive={page.getPath() === currentPagePath}
              href={page.getPath()}
              onClick={onChangeCurrentPage}
            >
              {page.title}
            </Navigation.Item>
          ),
        )}
      </Navigation>
    );
  };

  render = () => {
    const { className } = this.props;
    const { isNavigationExpanded } = this.state;

    return (
      <Panel className={cn(className, styles.root)}>
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
          <Button onClick={this.handleClickLogout} size="m">
            <Translation id="auth:logout" />
          </Button>
        </div>
      </Panel>
    );
  };
}

export default inject(({ auth }) => ({
  onLogout: auth.logout,
}))(Header);
