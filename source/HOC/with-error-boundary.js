// @flow

import React from 'react';
import { ErrorBoundary } from '~/components/error-boundary';
import type { ComponentType } from 'react';

export const withErrorBoundary = (
  Component: ComponentType<any>,
  FallbackComponent: ComponentType<any>,
  onError: Function,
): Function => {
  const Wrapped = (props) => (
    <ErrorBoundary FallbackComponent={FallbackComponent} onError={onError}>
      <Component {...props} />
    </ErrorBoundary>
  );

  const name = Component.displayName || Component.name;

  Wrapped.displayName = name
    ? `withErrorBoundary(${name})`
    : 'withErrorBoundary';

  return Wrapped;
};
