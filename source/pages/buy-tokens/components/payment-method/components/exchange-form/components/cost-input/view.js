// @flow

import * as React from 'react';
import { Input } from '@daonomic/ui';
import { i18n } from '~/domains/app/i18n';
import { markerTreeContext } from '~/providers/marker-tree';

// $FlowFixMe
import { Trans } from '@lingui/macro';

import type { CostInputProps } from './types';

const precision = 6;

export const CostInputView = (props: CostInputProps) => {
  const { cost, onChange, paymentMethod } = props;
  const formattedCost = parseFloat(cost.toFixed(precision));

  return (
    <markerTreeContext.Consumer>
      {({ markerCreator }) => (
        <Input
          data-marker={markerCreator('cost')()}
          type="number"
          min={parseFloat(`0.${'0'.repeat(precision - 1)}1`)}
          step={parseFloat(`0.${'0'.repeat(precision - 1)}1`)}
          label={<Trans>Cost</Trans>}
          value={formattedCost === 0 ? '' : String(formattedCost)}
          placeholder={
            paymentMethod
              ? i18n._(`Estimated cost in ${paymentMethod.id}`)
              : i18n._(`Select tokens..`)
          }
          onChange={onChange}
        />
      )}
    </markerTreeContext.Consumer>
  );
};
