import { UntypedFormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

const END_OF_SALE = 'endOfSale';
const END_OF_SALE_DATE = 'endOfSaleDate';

export const EndOfSaleEndOfSaleDateValidator: ValidatorFn = (control: UntypedFormGroup): ValidationErrors | null => {
  const endOfSale = control.get(END_OF_SALE).value;
  const endOfSaleDate = control.get(END_OF_SALE_DATE).value;

  if (!endOfSale) {
    return null;
  }

  if (!endOfSaleDate) {
    const validateError = { required: true };
    control.get(END_OF_SALE_DATE).setErrors(validateError);
    return validateError;
  }

  return null;
};
