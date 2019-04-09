// @flow

import React from 'react';
import { markerTreeContext } from '~/providers/marker-tree';
import { Form, Button } from '@daonomic/ui';
// $FlowFixMe
import { Trans } from '@lingui/macro';
import { KyberButton } from '~/components/kyber-button';

type Props = {|
  hidden?: boolean,
  isKyber?: boolean,
  ethAmount: number,
  disabled?: boolean,
|};

export function SubmitButton(props: Props) {
  if (props.hidden) return null;

  let button = (
    <markerTreeContext.Consumer>
      {({ markerCreator }) => (
        <Button
          data-marker={markerCreator('buy')()}
          type="submit"
          disabled={props.disabled}
        >
          <Trans>Buy</Trans>
        </Button>
      )}
    </markerTreeContext.Consumer>
  );

  if (props.isKyber) {
    button = (
      <markerTreeContext.Consumer>
        {({ markerCreator }) => (
          <KyberButton
            data-marker={markerCreator('buy-erc20')()}
            ethAmount={props.ethAmount}
            disabled={props.disabled} 
          >
            <Trans>Buy</Trans>
          </KyberButton>
        )}
      </markerTreeContext.Consumer>
    );
  }

  return (
    <Form.Field withGhostLabel style={{ flex: '0 0 auto' }}>
      {button}
    </Form.Field>
  );
}
