// @flow
import * as React from 'react';

export type ComponentProps = {
  children?: React.Node,
  className?: string,
};

export type DataState = 'initial' | 'loading' | 'loaded' | 'failed';

export type FormValidationResult = {|
  reason?: string,
  genericErrors: string[],
  fieldErrors: {|
    [key: string]: ?(string[]),
  |},
|};

export type FormValidationError = {
  response: {
    data: FormValidationResult,
  },
};
