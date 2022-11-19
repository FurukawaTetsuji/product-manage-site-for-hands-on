import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';

import { EndOfSaleEndOfSaleDateValidator } from './end-of-sale-end-of-sale-date-validator';

const END_OF_SALE_DATE = 'endOfSaleDate';

describe('EndOfSaleEndOfSaleDateValidator', () => {
  const formBuilder: UntypedFormBuilder = new UntypedFormBuilder();
  const testingForm: UntypedFormGroup = formBuilder.group({
    endOfSale: new UntypedFormControl(''),
    endOfSaleDate: new UntypedFormControl('')
  });

  describe('#validate', () => {
    it('should not have error', () => {
      testingForm.setValue({ endOfSale: false, endOfSaleDate: null });
      expect(EndOfSaleEndOfSaleDateValidator(testingForm)).toBeNull();
      expect(testingForm.get(END_OF_SALE_DATE).getError('required')).toBeNull();
    });

    it('should have error', () => {
      testingForm.setValue({ endOfSale: true, endOfSaleDate: null });
      expect(EndOfSaleEndOfSaleDateValidator(testingForm)).toEqual({ required: true });
      expect(testingForm.get(END_OF_SALE_DATE).getError('required')).toBeTruthy();
    });
  });
});
