import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

@inject(({ auth }) => ({
  isAuthenticated: auth.isAuthenticated,
}))
@observer
export default class PrivateRoute extends Component {
  static propTypes = {
    children: PropTypes.node,
    isAuthenticated: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    children: null,
  };

  render() {
    const { isAuthenticated, children, ...rest } = this.props;

    return (
      <Route
        {...rest}
        render={(props) => {
          if (isAuthenticated) {
            return children;
          }

          return (
            <Redirect to={{
              pathname: '/sign/in',
              state: { from: props.location },
            }}
            />
          );
        }}
      />
    );
  }
}
