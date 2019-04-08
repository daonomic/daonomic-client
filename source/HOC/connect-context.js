// @flow

import * as React from 'react';

export const connectContext = (
  ContextProvider: any,
  mapContextToProps: (context: any) => mixed,
) => (Component: any) => {
  const WrappedContextComponent = (props: mixed) => (
    <ContextProvider.Consumer>
      {(context) => <Component {...mapContextToProps(context)} {...props} />}
    </ContextProvider.Consumer>
  );

  const componentName = Component.displayName || Component.name;
  const providerName = ContextProvider.displayName || ContextProvider.name;
  const wrapperName = `${providerName}(${componentName})`;

  WrappedContextComponent.displayName = wrapperName;

  return WrappedContextComponent;
};
