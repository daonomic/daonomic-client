// @flow

import * as React from 'react';
import { Input } from '@daonomic/ui';
import { i18n } from '~/domains/app/i18n';
import { markerTreeContext } from '~/providers/marker-tree';

// $FlowFixMe
import { Trans } from '@lingui/macro';

import type { AmountInputProps } from './types';

export const AmountInputView = (props: AmountInputProps) => {
  const { amount, tokenSymbol, onChange } = props;

  return (
    <markerTreeContext.Consumer>
      {({ markerCreator }) => (
        <Input
          data-marker={markerCreator('amount')()}
          type="number"
          step="any"
          min="0"
          placeholder={i18n._(`Enter amount of ${tokenSymbol}`)}
          label={<Trans>Amount</Trans>}
          value={amount === 0 ? '' : String(amount)}
          onChange={onChange}
        />
      )}
    </markerTreeContext.Consumer>
  );
};
