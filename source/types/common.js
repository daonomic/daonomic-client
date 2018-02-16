// @flow
import * as React from 'react';

export type ComponentProps = {
  children?: React.Node,
  className?: string,
};

export type DataState = 'initial' | 'loading' | 'loaded' | 'failed';
