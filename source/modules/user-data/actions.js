// @flow
import { path } from 'ramda';
import { api } from '~/api';
import { getWeb3Instance } from '~/services/web3/provider';
import { userData } from '~/modules/user-data/store';

import type { Address, UserData } from '~/modules/user-data/types';

export async function getProspectiveUserAddress(): Promise<?Address> {
  try {
    const web3 = await getWeb3Instance();

    return web3.eth.defaultAccount;
  } catch (error) {
    return;
  }
}

export async function loadAndSetUserData() {
  userData.setDataState('loading');

  try {
    const prospectiveAddress = await getProspectiveUserAddress();

    if (prospectiveAddress) {
      userData.setProspectiveAddress(prospectiveAddress);
    }
  } catch (error) {
    // do nothing
  }

  try {
    const { data } = await api.userData.get();

    if (data.address) {
      userData.setAddress(data.address);
    }

    if (data.country) {
      userData.setCountry(data.country);
    }

    userData.setDataState('loaded');
  } catch (error) {
    const responseStatus = path(['response', 'status'], error);

    userData.setDataState(
      responseStatus && responseStatus === 404 ? 'loaded' : 'failed',
    );
  }
}

export async function saveUserData({ address, country }: UserData) {
  await api.userData.set({ address, country });
  userData.setAddress(address);
}
