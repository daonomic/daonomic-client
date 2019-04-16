// @flow

import React from 'react';
import { Modal, Button } from '@daonomic/ui';
import { Item } from './components/item';
import { Heading } from '~/components/heading';
import { markerTreeContext } from '~/providers/marker-tree';
import styles from './styles.css';

// $FlowFixMe
import { Trans } from '@lingui/macro';

import type { TokenPurchaseTransactionStatus } from '~/domains/business/token-purchase/types';

export type TokenPurchaseModalProps = {|
  transactionStatus: TokenPurchaseTransactionStatus,
  resetState: () => void,
  error: ?Error,
  isProcessing: boolean,
|};

export const TokenPurchaseModalView = (props: TokenPurchaseModalProps) => {
  const { transactionStatus, error } = props;

  if (!props.isProcessing || transactionStatus.state === 'idle') {
    return null;
  }

  const continueButton = (additionalProps) => (
    <markerTreeContext.Consumer>
      {({ markerCreator }) => (
        <Button
          design="primary"
          data-marker={markerCreator('continue')()}
          onClick={props.resetState}
          size="m"
          {...additionalProps}
        >
          <Trans>Continue work</Trans>
        </Button>
      )}
    </markerTreeContext.Consumer>
  );

  if (error) {
    return (
      <Modal
        isOpen
        title={<Trans>Oops. Unexpected error was thrown</Trans>}
        onClose={props.resetState}
      >
        <React.Fragment>
          <p>
            <Trans>
              Error description: {error.message || 'Unknown error'}. More
              detailed info see in console
            </Trans>
          </p>
          {continueButton()}
        </React.Fragment>
      </Modal>
    );
  }

  const currentIndex =
    transactionStatus.chain &&
    transactionStatus.chain.indexOf(transactionStatus.state);

  return (
    <Modal
      isOpen
      title={<Trans>Token purchasing</Trans>}
      onClose={props.resetState}
    >
      <React.Fragment>
        {transactionStatus.chain ? (
          <React.Fragment>
            <div className={styles.heading}>
              <Heading size="large" tagName="h2">
                <Trans>Your transaction is in progress</Trans>
              </Heading>
              <p>
                <Trans>
                  After last step, your wallet will be automatically updated
                </Trans>
              </p>
            </div>
            {transactionStatus.chain.map((item, index) => (
              <div className={styles.item} key={index}>
                <Item
                  id={item}
                  isLoadable={['awaiting_confirmation'].indexOf(item) !== -1}
                  isCurrent={currentIndex === index}
                  isPassed={index <= currentIndex}
                />
              </div>
            ))}
          </React.Fragment>
        ) : (
          <Heading size="large" tagName="h2" className={styles.heading}>
            <Trans>No chain in progress.</Trans>
          </Heading>
        )}
        <div className={styles.continue}>
          {continueButton({
            disabled: transactionStatus.state !== 'transfered',
          })}
        </div>
      </React.Fragment>
    </Modal>
  );
};
