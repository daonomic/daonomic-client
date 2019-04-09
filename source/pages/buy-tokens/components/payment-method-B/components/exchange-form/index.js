// @flow

import React from 'react';

// $FlowFixMe
import { Trans } from '@lingui/macro';
import { markerTreeContext } from '~/providers/marker-tree';
import { SubmitButton } from './components/submit-button';
import { AmountInput } from './components/amount-input';
import { Form, Input } from '@daonomic/ui';

import * as DataStateTypes from '~/domains/data/data-state/types';
import type { ExchangeFormValue } from './types';

type Props = {|
  amount: number,
  cost: number,
  onSubmit: () => void,
  formattedCost: number,
  isHydrating: boolean,
  costPrecision: number,
  bonus: DataStateTypes.LoadableData<number>,
  isImmediatePurchaseAvailable: boolean,
  handleValue: (value: ExchangeFormValue) => void,
|};

export const ExchangeFormView = (props: Props) => {
  return (
    <markerTreeContext.Consumer>
      {({ markerCreator }) => (
        <Form
          data-marker={markerCreator()}
          onSubmit={(event) => {
            event.preventDefault();
            props.onSubmit();
          }}
        >
          <Form.Group>
            <Form.Field>
              <AmountInput />
            </Form.Field>

            <Form.Field>
              <Input
                data-marker={markerCreator('cost')()}
                type="number"
                min={parseFloat(`0.${'0'.repeat(props.costPrecision - 1)}1`)}
                step={parseFloat(`0.${'0'.repeat(props.costPrecision - 1)}1`)}
                label={<Trans>Cost</Trans>}
                value={String(props.formattedCost)}
                disabled={props.isHydrating}
                onChange={(event) => {
                  props.handleValue({
                    cost: Number(event.target.value),
                    amount: props.amount,
                  });
                }}
              />
            </Form.Field>

            <SubmitButton
              ethAmount={props.cost}
              disabled={props.cost === 0 || props.isHydrating}
              hidden={!props.isImmediatePurchaseAvailable}
            />
          </Form.Group>
        </Form>
      )}
    </markerTreeContext.Consumer>
  );
};
