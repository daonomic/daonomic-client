// @flow
import type { KycStatus, UserStatus } from '~/types/kyc';

export default function getUserStatus({
  kycStatus,
  hasUserData,
}: {
  kycStatus: KycStatus,
  hasUserData: boolean,
}): UserStatus {
  switch (kycStatus) {
    case 'NO_KYC':
    case 'COMPLETED': {
      return 'ALLOWED';
    }

    case 'DENIED': {
      return 'DENIED';
    }

    default: {
      if (hasUserData) {
        return 'ON_REVIEW';
      }

      return 'NOT_SET';
    }
  }
}
