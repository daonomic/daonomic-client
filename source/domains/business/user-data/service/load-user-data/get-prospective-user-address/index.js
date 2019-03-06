// @flow
import { web3Service } from '~/domains/business/web3/service';

import type { Address } from '~/domains/business/user-data/types';

export async function getProspectiveUserAddress(): Promise<?Address> {
  if (!web3Service) {
    return;
  }

  try {
    const address = await web3Service.getWalletAddress();

    return address;
  } catch (error) {
    return;
  }
}
