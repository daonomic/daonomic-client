//@flow
import * as React from 'react';
import { Tooltip } from '@daonomic/ui';
import { addressService } from '~/domains/business/address/service';
import { etherscan } from '~/domains/business/etherscan';

type Props = {|
  address: string,
|};

export function Address({ address }: Props) {
  return (
    <Tooltip placement="top" trigger={['hover']} overlay={address}>
      <a
        href={etherscan.getAddressUrl(address)}
        target="_blank"
        rel="noopener noreferrer"
      >
        {addressService.truncate(address)}
      </a>
    </Tooltip>
  );
}
