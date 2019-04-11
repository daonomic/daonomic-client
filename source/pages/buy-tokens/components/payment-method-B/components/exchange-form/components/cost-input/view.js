// @flow

import * as React from 'react';
import { Input } from '@daonomic/ui';
import { markerTreeContext } from '~/providers/marker-tree';

// $FlowFixMe
import { Trans } from '@lingui/macro';

import type { CostInputProps } from './types';

export class CostInputView extends React.PureComponent<CostInputProps> {
  handleChange = (event: SyntheticInputEvent<HTMLSelectElement>): void => {
    const { handleValue, amount } = this.props;

    handleValue({
      cost: Number(event.target.value),
      amount,
    });
  };

  render() {
    const {
      isHydrating,
      formattedCost,
      costPrecision,
      selectedPaymentMethod,
    } = this.props;

    return (
      <markerTreeContext.Consumer>
        {({ markerCreator }) => (
          <Input
            data-marker={markerCreator('cost')()}
            type="number"
            min={parseFloat(`0.${'0'.repeat(costPrecision - 1)}1`)}
            step={parseFloat(`0.${'0'.repeat(costPrecision - 1)}1`)}
            label={<Trans>Cost</Trans>}
            value={formattedCost === 0 ? '' : String(formattedCost)}
            placeholder={
              selectedPaymentMethod
                ? `Estimated cost in ${selectedPaymentMethod.id}`
                : 'Select tokens..'
            }
            disabled={isHydrating}
            onChange={this.handleChange}
          />
        )}
      </markerTreeContext.Consumer>
    );
  }
}
