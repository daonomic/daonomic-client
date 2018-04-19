// @flow
import type { KycFormField, KycFormFieldName } from '~/types/kyc';

const requiredError = 'This field is required';

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
  ({ field, allFields }) => {
    if (field.type === 'STRING') {
      if (
        ['address', 'addressConfirmation'].includes(field.name) &&
        (field.value.slice(0, 2) !== '0x' || field.value.slice(2).length !== 40)
      ) {
        return {
          name: field.name,
          error: 'should be hex address with 20-bytes length',
        };
      }

      if (field.name === 'addressConfirmation') {
        const addressField = allFields.find(
          (field) => field.name === 'address',
        );

        if (addressField && field.value !== addressField.value) {
          return {
            name: field.name,
            error: "Addresses don't match",
          };
        }
      }
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
