// @flow
import { userData } from '~/domains/business/user-data';
import { userDataApi } from '~/domains/business/user-data/api';

import type { UserData } from '~/domains/business/user-data/types';

export async function saveUserData(data: UserData): Promise<void> {
  await userDataApi.set(data);
  userData.setAddress(data.address);
}
