// @flow
import { getTranslation } from '~/i18n';
import type { KycFormField, KycFormFieldName } from '~/types/kyc';

const requiredError = getTranslation('common:requiredField');

type ValidationEntry = {|
  name: KycFormFieldName,
  error: string,
|};

type ValidatorParams = {|
  field: KycFormField,
  allFields: KycFormField[],
|};

type Validator = (params: ValidatorParams) => ?ValidationEntry;

const validators: Validator[] = [
  ({ field }) => {
    if (field.type === 'FILE' && field.required && field.value.length === 0) {
      return {
        name: field.name,
        error: requiredError,
      };
    }
  },
  ({ field }) => {
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

  form.forEach((field, _, allFields) => {
    const [fieldValidationResult] = validators
      .map((validator) => validator({ field, allFields }))
      .filter(Boolean);

    if (fieldValidationResult) {
      errors.push(fieldValidationResult);
    }
  });

  return errors;
}
