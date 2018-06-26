// @flow
import type { BaseField, FieldValue } from '~/modules/kyc/types';

export function getDefaultFieldValue(field: BaseField): FieldValue {
  switch (field.type) {
    case 'FILE': {
      return [];
    }

    case 'BOOLEAN': {
      return false;
    }

    case 'STRING': {
      return '';
    }

    default: {
      (field.type: empty);
      return '';
    }
  }
}
