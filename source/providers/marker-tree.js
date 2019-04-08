// @flow
import * as React from 'react';
import { getMarker } from '~/utils/get-marker';

type MarkerTreeValueType = {
  markerCreator: Function,
};

export const markerTreeContext = React.createContext<MarkerTreeValueType>({});

type Props = {
  children: React.Node,
  markerRoot: string,
};

export function MarkerTreeProvider(props: Props) {
  return (
    <markerTreeContext.Provider
      value={{
        markerCreator: getMarker(props.markerRoot),
      }}
    >
      {props.children}
    </markerTreeContext.Provider>
  );
}

export const withMarkerTreeProvider = (markerRootName: string) => (
  Component: any,
) => {
  const ComponentWithMarkerTreeProvider = (props: {}) => (
    <MarkerTreeProvider markerRoot={markerRootName}>
      <Component {...props} />
    </MarkerTreeProvider>
  );

  return ComponentWithMarkerTreeProvider;
};

export const withMarkerTreeContext = (Component: any) => {
  const ComponentWithMarkerTreeProvider = (props: {}) => (
    <markerTreeContext.Consumer>
      {(context) => (
        <Component {...props} markerCreator={context.markerCreator} />
      )}
    </markerTreeContext.Consumer>
  );

  return ComponentWithMarkerTreeProvider;
};
