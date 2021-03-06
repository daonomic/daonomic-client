// @flow

import React from 'react';
import { markerTreeContext } from '~/providers/marker-tree';
import { config } from '~/domains/app/config';

// $FlowFixMe
import { i18n } from '~/domains/app/i18n';
// $FlowFixMe
import { Trans, t } from '@lingui/macro';

import { SubmitButton } from './components/submit-button';
import { AmountInput } from './components/amount-input';
import { CostInput } from './components/cost-input';
import { ResetButton } from './components/reset-button';
import { LastTransaction } from './components/last-transaction';
import { Form, Checkbox } from '@daonomic/ui';
import style from './style.css';

import type { ExchangeFormViewProps } from './types';

export class ExchangeFormView extends React.PureComponent<ExchangeFormViewProps> {
  onSubmit = (event: SyntheticInputEvent<HTMLSelectElement>): void => {
    const { onSubmit } = this.props;

    event.preventDefault();
    onSubmit();
  };

  render() {
    const {
      displayResetButton,
      hasError,
      isKyber,
      hasLastTransaction,
      handleIsAgreeWithKyberTerms,
    } = this.props;

    return (
      <markerTreeContext.Consumer>
        {({ markerCreator }) => (
          <React.Fragment>
            {hasLastTransaction && (
              <section className={style.last_transaction}>
                <LastTransaction />
              </section>
            )}
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
            {hasError && (
              <p className={style.error}>
                <Trans>Something went wrong</Trans>
              </p>
            )}
            {isKyber && (
              <div className={style.kyber}>
                <p>
                  <Trans>
                    This transaction will be provided by{' '}
                    <a
                      href="https://kyber.network/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Kyber Network
                    </a>
                  </Trans>
                </p>
                <markerTreeContext.Consumer>
                  {({ markerCreator }) => (
                    <Checkbox
                      required
                      data-marker={markerCreator('kyber-network-checkbox')()}
                      onChange={(event) =>
                        handleIsAgreeWithKyberTerms(event.target.checked)
                      }
                      label={i18n._(
                        t`I have read and agree to the <a href="${
                          config.kyberNetworkTerms
                        }" target="_blank" rel="noopener noreferrer">Terms of kyber.network service</a>`,
                      )}
                    />
                  )}
                </markerTreeContext.Consumer>
              </div>
            )}
          </React.Fragment>
        )}
      </markerTreeContext.Consumer>
    );
  }
}
