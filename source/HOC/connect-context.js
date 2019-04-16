// @flow

import * as React from 'react';

export function connectContext<ProviderValue>(
  ContextProvider: {|
    Consumer: React.ComponentType<mixed>,
    displayName: ?string,
    name: ?string,
  |},
  mapContextToProps: (context: ProviderValue) => mixed,
) {
  return (Component: React.ComponentType<mixed>) => {
    const WrappedContextComponent = (props: mixed) => (
      <ContextProvider.Consumer>
        {(context) => <Component {...mapContextToProps(context)} {...props} />}
      </ContextProvider.Consumer>
    );

    const componentName =
      Component.displayName || Component.name || 'UnknownComp';

    const providerName =
      ContextProvider.displayName || ContextProvider.name || 'UnknownProvider';

    const wrapperName = `${providerName}(${componentName})`;

    WrappedContextComponent.displayName = wrapperName;

    return WrappedContextComponent;
  };
}
