// @flow
import type { BaseKycFormField } from '~/types/kyc';

export default function kycFieldsToFormSchema(kycFields: BaseKycFormField[]) {
  return kycFields.reduce((result, field) => {
    result.push(field);

    if (field.name === 'address') {
      result.push({
        type: 'STRING',
        name: 'addressConfirmation',
        label: `${field.label} confirmation`,
        required: true,
      });
    }

    return result;
  }, []);
}
