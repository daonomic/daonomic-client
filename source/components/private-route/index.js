// @flow
import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

type Props = {
  children: React.Node,
  isAuthenticated: boolean,
};

@observer
class PrivateRoute extends React.Component<Props, {}> {
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

export default inject(({ auth }) => ({
  isAuthenticated: auth.isAuthenticated,
}))(PrivateRoute);
