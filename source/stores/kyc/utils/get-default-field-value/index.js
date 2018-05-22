// @flow
import type { BaseKycFormField } from '~/types/kyc';

export default function getDefaultFieldValue(field: BaseKycFormField) {
  let defaultValue = '';

  if (field.type === 'FILE') {
    defaultValue = [];
  } else if (field.type === 'BOOLEAN') {
    defaultValue = false;
  }

  return defaultValue;
}
