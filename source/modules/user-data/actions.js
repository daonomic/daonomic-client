// @flow
import { path } from 'ramda';
import { api } from '~/domains/app/api';
import { web3Service } from '~/domains/business/web3/service';
import { userData } from '~/modules/user-data/store';

import type { Address, UserData } from '~/modules/user-data/types';

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

export async function saveUserData(data: UserData) {
  await api.userData.set(data);
  userData.setAddress(data.address);
}
