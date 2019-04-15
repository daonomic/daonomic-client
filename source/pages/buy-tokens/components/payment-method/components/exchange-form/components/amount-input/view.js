// @flow

import * as React from 'react';
import { Input } from '@daonomic/ui';
import { markerTreeContext } from '~/providers/marker-tree';

// $FlowFixMe
import { Trans } from '@lingui/macro';

import type { AmountInputProps } from './types';

// @todo i18n phrases

export const AmountInputView = (props: AmountInputProps) => {
  const { isHydrating, amount, tokenSymbol, onChange } = props;

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
          onChange={onChange}
        />
      )}
    </markerTreeContext.Consumer>
  );
};
