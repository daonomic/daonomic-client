import { userData as user } from '~/domains/business/user-data/store';

export const getUserAddress = () => {
  return user.model.address || '';
};
