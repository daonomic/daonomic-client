// @flow

import React from 'react';
import { markerTreeContext } from '~/providers/marker-tree';

// $FlowFixMe
import { Trans } from '@lingui/macro';

import { SubmitButton } from './components/submit-button';
import { AmountInput } from './components/amount-input';
import { CostInput } from './components/cost-input';
import { ResetButton } from './components/reset-button';
import { Form } from '@daonomic/ui';
import style from './style.css';

import type { ExchangeFormViewProps } from './types';

export class ExchangeFormView extends React.PureComponent<ExchangeFormViewProps> {
  onSubmit = (event: SyntheticInputEvent<HTMLSelectElement>): void => {
    const { onSubmit } = this.props;

    event.preventDefault();
    onSubmit();
  };

  render() {
    const { displayResetButton, hasFetchError } = this.props;

    return (
      <markerTreeContext.Consumer>
        {({ markerCreator }) => (
          <React.Fragment>
            <Form data-marker={markerCreator()} onSubmit={this.onSubmit}>
              <Form.Group>
                <Form.Field>
                  <AmountInput />
                </Form.Field>
                <Form.Field>
                  <CostInput />
                </Form.Field>
                <Form.Field withGhostLabel style={{ flex: '0 0 auto' }}>
                  <SubmitButton />
                </Form.Field>
              </Form.Group>
            </Form>
            {displayResetButton && <ResetButton />}
            {hasFetchError && (
              <p className={style.error}>
                <Trans>Something went wrong</Trans>
              </p>
            )}
          </React.Fragment>
        )}
      </markerTreeContext.Consumer>
    );
  }
}
