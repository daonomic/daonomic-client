// @flow
import type { KycFormField, KycFormFieldName } from '~/types/kyc';

const requiredError = 'This field is required';

type ValidationEntry = {|
  name: KycFormFieldName,
  error: string,
|};

const validators = [
  (field: KycFormField): ?ValidationEntry => {
    if (field.type === 'FILE' && field.required && field.value.length === 0) {
      return {
        name: field.name,
        error: requiredError,
      };
    }
  },
  (field: KycFormField): ?ValidationEntry => {
    if (field.type === 'STRING') {
      if (
        field.name === 'address' &&
        (field.value.slice(0, 2) !== '0x' || field.value.slice(2).length !== 40)
      ) {
        return {
          name: field.name,
          error: 'should be hex address with 20-bytes length',
        };
      }
    }
  },
  (field: KycFormField): ?ValidationEntry => {
    if (field.required && !field.value) {
      return {
        name: field.name,
        error: requiredError,
      };
    }
  },
];

export function validateKycForm(form: KycFormField[]): ValidationEntry[] {
  const errors = [];

  form.forEach((field) => {
    const [fieldValidationResult] = validators
      .map((validator) => validator(field))
      .filter(Boolean);

    if (fieldValidationResult) {
      errors.push(fieldValidationResult);
    }
  });

  return errors;
}
