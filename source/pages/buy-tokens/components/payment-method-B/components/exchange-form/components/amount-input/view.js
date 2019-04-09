// @flow

import React from 'react';
import { Input } from '@daonomic/ui';
import { markerTreeContext } from '~/providers/marker-tree';

// $FlowFixMe
import { Trans, Plural } from '@lingui/macro';

import * as DataStateTypes from '~/domains/data/data-state/types';
import type { ExchangeFormValue } from '../../types';

export type ExternalProps = {
  isHydrating: boolean,
  bonus: DataStateTypes.LoadableData<number>,
  amount: number,
  handleValue: (value: ExchangeFormValue) => void,
  cost: number,
};

export const AmountInputView = (props: ExternalProps) => {
  return (
    <markerTreeContext.Consumer>
      {({ markerCreator }) => (
        <Input
          data-marker={markerCreator('amount')()}
          type="number"
          step="any"
          disabled={props.isHydrating}
          min="0"
          description={
            props.bonus.data && (
              <Plural
                value={props.bonus.data}
                one="You will receive # bonus token!"
                other="You will receive # bonus tokens!"
              />
            )
          }
          label={<Trans>Amount</Trans>}
          value={String(props.amount)}
          onChange={(event) => {
            props.handleValue({
              amount: Number(event.target.value),
              cost: props.cost,
            });
          }}
        />
      )}
    </markerTreeContext.Consumer>
  );
};
