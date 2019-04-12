// @flow

import React from 'react';
import { Modal, Button } from '@daonomic/ui';
import { Item } from './components/item';
import { Heading } from '~/components/heading';
import styles from './styles.css';

// $FlowFixMe
import { Trans } from '@lingui/macro';

import * as PurchaseHooksTypes from '~/providers/purchase-hooks/types';

export type KyberTransactionProcessProps = {|
  transactionStatus: PurchaseHooksTypes.PurchaseHooksTransactionStatus,
  resetKyberTransactionState: () => void,
  error: ?Error,
  isProcessing: boolean,
|};

export const KyberTransactionProcessView = (
  props: KyberTransactionProcessProps,
) => {
  const { transactionStatus, error } = props;

  if (!props.isProcessing || transactionStatus.state === 'idle') {
    return null;
  }

  if (error) {
    return (
      <Modal
        isOpen
        title={<Trans>Oops. Unexpected error throwed</Trans>}
        onClose={props.resetKyberTransactionState}
      >
        <React.Fragment>
          <p>
            <Trans>
              Error description: {error.message || 'Unknown error'}. More
              detailed info see in console
            </Trans>
          </p>
          <Button
            design="primary"
            onClick={props.resetKyberTransactionState}
            size="m"
          >
            Continue
          </Button>
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
      onClose={props.resetKyberTransactionState}
    >
      <React.Fragment>
        {transactionStatus.chain ? (
          <React.Fragment>
            <div className={styles.heading}>
              <Heading size="large" tagName="h1">
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
                  isCurrent={currentIndex === index}
                  isPassed={index <= currentIndex}
                />
              </div>
            ))}
          </React.Fragment>
        ) : (
          <Heading size="large" tagName="h1" className={styles.heading}>
            <Trans>No chain in progress.</Trans>
          </Heading>
        )}
        <div className={styles.continue}>
          <Button
            design="primary"
            disabled={transactionStatus.state !== 'transfered'}
            onClick={props.resetKyberTransactionState}
            size="m"
          >
            <Trans>Continue work</Trans>
          </Button>
        </div>
      </React.Fragment>
    </Modal>
  );
};
