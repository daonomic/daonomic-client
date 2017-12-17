import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import cn from 'classnames';
import Button from '@daonomic/ui/source/button';
import Panel from '@daonomic/ui/source/panel';
import Translation from '~/components/translation';
import Navigation from '~/components/navigation';
import Burger from '~/components/burger';
import pages from '~/pages';
import styles from './header.css';

@inject(({ auth }) => ({
  onLogout: auth.logout,
}))
@observer
export default class Header extends Component {
  static propTypes = {
    currentPagePath: PropTypes.string.isRequired,
    onChangeCurrentPage: PropTypes.func.isRequired,
    className: PropTypes.string,
    onLogout: PropTypes.func.isRequired,
  };

  static defaultProps = {
    className: '',
  };

  state = {
    isNavigationExpanded: false,
  };

  componentDidUpdate = (prevProps) => {
    this.collapseNavigationIfCurrentPageChanged(prevProps.currentPagePath);
  };

  collapseNavigationIfCurrentPageChanged = (prevPagePath) => {
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
    const {
      currentPagePath,
      onChangeCurrentPage,
    } = this.props;

    return (
      <Navigation>
        {[pages.app.buyTokens, pages.app.createWallet, pages.app.faq].map((page) => (
          <Navigation.Item
            key={page.getPath()}
            isActive={page.getPath() === currentPagePath}
            href={page.getPath()}
            onClick={onChangeCurrentPage}
          >
            {page.title}
          </Navigation.Item>
        ))}
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
          <Button onClick={this.handleClickLogout} size="small">
            <Translation id="auth:logout" />
          </Button>
        </div>
      </Panel>
    );
  };
}
