// @flow

import React from 'react';
import { markerTreeContext } from '~/providers/marker-tree';
import { Button } from '@daonomic/ui';

// $FlowFixMe
import { Trans } from '@lingui/macro';

import type { SubmitButtonProps } from './types';

export const SubmitButtonView = (props: SubmitButtonProps) => {
  return (
    <markerTreeContext.Consumer>
      {({ markerCreator }) => (
        <Button
          type="submit"
          data-marker={markerCreator('buy')()}
          disabled={props.disabled}
          design="primary"
        >
          <Trans>Buy</Trans>
        </Button>
      )}
    </markerTreeContext.Consumer>
  );
};
