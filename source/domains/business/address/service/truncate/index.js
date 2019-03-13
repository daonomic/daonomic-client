// @flow
import * as AddressTypes from '~/domains/business/address/types';

export function truncate(address: AddressTypes.Address): string {
  return `${address.slice(0, 5)}...${address.slice(-3)}`;
}
