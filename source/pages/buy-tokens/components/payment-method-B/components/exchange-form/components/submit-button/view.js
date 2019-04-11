// @flow

import React from 'react';
import { markerTreeContext } from '~/providers/marker-tree';
import { Button } from '@daonomic/ui';

// $FlowFixMe
import { Trans } from '@lingui/macro';

import type { SubmitButtonProps } from './types';

export class SubmitButtonView extends React.PureComponent<SubmitButtonProps> {
  render() {
    return (
      <markerTreeContext.Consumer>
        {({ markerCreator }) => (
          <Button
            type="submit"
            data-marker={markerCreator('buy')()}
            disabled={this.props.disabled}
            design="primary"
          >
            <Trans>Buy</Trans>
          </Button>
        )}
      </markerTreeContext.Consumer>
    );
  }
}
