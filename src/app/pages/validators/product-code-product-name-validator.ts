import { UntypedFormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

const PRODUCT_CODE = 'productCode';
const PRODUCT_NAME = 'productName';
export const ProductCodeProductNameValidator: ValidatorFn = (control: UntypedFormGroup): ValidationErrors | null => {
  const productCode = control.get(PRODUCT_CODE).value;
  const productName = control.get(PRODUCT_NAME).value;

  if (productCode && productName) {
    control.get(PRODUCT_CODE).setErrors(null);
    return null;
  }

  const validateError = { productNotExistError: true };
  control.get(PRODUCT_CODE).setErrors(validateError);
  return validateError;
};
