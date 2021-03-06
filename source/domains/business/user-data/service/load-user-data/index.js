// @flow
import { path } from 'ramda';
import { userData } from '~/domains/business/user-data';
import { userDataApi } from '~/domains/business/user-data/api';

export async function loadUserData() {
  userData.setDataState('loading');

  try {
    const data = await userDataApi.get();

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
