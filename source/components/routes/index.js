import React, { Component } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import { translate } from 'react-i18next';
import PrivateRoute from '~/components/private-route';
import pages from '~/pages';

@translate([], { wait: true })
export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path={pages.signin.getPath()}
          component={pages.signin.component}
        />

        <Route
          exact
          component={pages.signup.component}
          path={pages.signup.getPath()}
        />

        <Route
          exact
          component={pages.sendResetInstructions.component}
          path={pages.sendResetInstructions.getPath()}
        />

        <Route
          exact
          component={pages.createNewPassword.component}
          path={pages.createNewPassword.getPath()}
        />

        <Redirect
          exact
          from="/"
          to={pages.app.getPath()}
        />

        <PrivateRoute path={pages.app.getPath()}>
          <pages.app.component>
            <Switch>
              <Route
                exact
                path={pages.app.buyTokens.getPath()}
                component={pages.app.buyTokens.component}
              />

              <Route
                exact
                path={pages.app.createWallet.getPath()}
                component={pages.app.createWallet.component}
              />

              <Route
                exact
                path={pages.app.faq.getPath()}
                component={pages.app.faq.component}
              />

              <Redirect
                to={pages.app.buyTokens.getPath()}
              />
            </Switch>
          </pages.app.component>
        </PrivateRoute>

        <Route
          path="*"
          render={() => 'Not found'}
        />
      </Switch>
    );
  }
}
