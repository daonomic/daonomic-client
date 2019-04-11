// @flow

import React from 'react';
import { purchaseHooksContext } from '~/providers/purchase-hooks';

import * as PurchaseHooksTypes from '~/providers/purchase-hooks/types';

export type KyberTransactionProcessProps = {|
  status: PurchaseHooksTypes.PurchaseHooksTransactionState,
|};

const KyberTransactionProcessView = (props: KyberTransactionProcessProps) => {
  const { status } = props;

  if (status === 'idle') {
    return null;
  }

  return (
    <Modal
      isOpen
      title={<Trans>Attention</Trans>}
      onClose={() => {
        handleWeb3Notification(false);
      }}
    >
      <p>
        <Trans>
          To work with your wallet, you must install web3-driver. For example,
          we recommend{' '}
          <a href="" target="blank">
            Metamask
          </a>
        </Trans>
      </p>
    </Modal>
  );
};
