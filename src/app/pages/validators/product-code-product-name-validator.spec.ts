import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { ProductCodeProductNameValidator } from './product-code-product-name-validator';

const PRODUCT_CODE = 'productCode';

describe('ProductCodeProductNameValidator', () => {
  const formBuilder: FormBuilder = new FormBuilder();
  const testingForm: FormGroup = formBuilder.group({
    productCode: new FormControl(''),
    productName: new FormControl('')
  });

  describe('#validate', () => {
    it('should not have error', () => {
      testingForm.setValue({ productCode: 'productCode', productName: 'productName' });
      expect(ProductCodeProductNameValidator(testingForm)).toBeNull();
      expect(testingForm.get(PRODUCT_CODE).getError('productNotExistError')).toBeNull();
    });

    it('should have error', () => {
      testingForm.setValue({ productCode: 'productCode', productName: null });
      expect(ProductCodeProductNameValidator(testingForm)).toEqual({ productNotExistError: true });
      expect(testingForm.get(PRODUCT_CODE).getError('productNotExistError')).toBeTruthy();
    });
  });
});
