// @flow

import * as React from 'react';
import { Input } from '@daonomic/ui';
import { markerTreeContext } from '~/providers/marker-tree';

// $FlowFixMe
import { Trans } from '@lingui/macro';

import type { AmountInputProps } from './types';

export class AmountInputView extends React.PureComponent<AmountInputProps> {
  handleChange = (event: SyntheticInputEvent<HTMLSelectElement>): void => {
    const { handleValue, cost } = this.props;

    handleValue({
      amount: Number(event.target.value),
      cost,
    });
  };

  render() {
    const { isHydrating, amount, tokenSymbol } = this.props;

    return (
      <markerTreeContext.Consumer>
        {({ markerCreator }) => (
          <Input
            data-marker={markerCreator('amount')()}
            type="number"
            step="any"
            disabled={isHydrating}
            min="0"
            placeholder={`Enter amount of ${tokenSymbol}`}
            label={<Trans>Amount</Trans>}
            value={amount === 0 ? '' : String(amount)}
            onChange={this.handleChange}
          />
        )}
      </markerTreeContext.Consumer>
    );
  }
}
