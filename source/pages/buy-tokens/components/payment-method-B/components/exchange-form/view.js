// @flow

import React from 'react';

// $FlowFixMe
import { Trans, Plural } from '@lingui/macro';
import { markerTreeContext } from '~/providers/marker-tree';
import { Form, Input } from '@daonomic/ui';

type Props = {|
  amount: number,
  cost: number,
|};

export const ExchangeFormView = (props: Props) => {
  const { amount, cost } = props;

  return (
    <markerTreeContext.Consumer>
      {({ markerCreator }) => (
        <Form data-marker={markerCreator()} onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Field>
              <Input
                data-marker={markerCreator('amount')()}
                type="number"
                step="any"
                min="0"
                description={
                  this.props.bonus && (
                    <Plural
                      value={this.props.bonus}
                      one="You will receive # bonus token!"
                      other="You will receive # bonus tokens!"
                    />
                  )
                }
                label={<Trans>Amount</Trans>}
                value={String(this.props.amount)}
                onChange={this.handleChangeAmount}
              />
            </Form.Field>

            <Form.Field>
              <Input
                data-marker={markerCreator('cost')()}
                type="number"
                min={parseFloat(
                  `0.${'0'.repeat(this.props.costPrecision - 1)}1`,
                )}
                step={parseFloat(
                  `0.${'0'.repeat(this.props.costPrecision - 1)}1`,
                )}
                label={<Trans>Cost</Trans>}
                value={String(this.props.cost)}
                onChange={this.handleChangeCost}
              />
            </Form.Field>

            {this.renderSubmitButton()}
          </Form.Group>
        </Form>
      )}
    </markerTreeContext.Consumer>
  );
};
