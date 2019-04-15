// @flow

import React from 'react';
import { markerTreeContext } from '~/providers/marker-tree';
import { KyberButton } from '~/components/kyber-button';
import { Button } from '@daonomic/ui';

// $FlowFixMe
import { Trans } from '@lingui/macro';

import type { SubmitButtonProps } from './types';

export const SubmitButtonView = ({ isKyber, disabled }: SubmitButtonProps) => {
  const ButtonElement = isKyber ? KyberButton : Button;

  return (
    <markerTreeContext.Consumer>
      {({ markerCreator }) => (
        <ButtonElement
          type="submit"
          data-marker={markerCreator('buy')()}
          disabled={disabled}
          design="primary"
        >
          <Trans>Buy</Trans>
        </ButtonElement>
      )}
    </markerTreeContext.Consumer>
  );
};
