import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import {
    PurchaseQuantityStockQuantityValidator
} from './purchase-quantity-stock-quantity-validator';

const PRODUCT_PURCHASE_QUANTITY = 'productPurchaseQuantity';
const LOCALE = 'ja-JP';

describe('PurchaseQuantityStockQuantityValidator', () => {
  const formBuilder: FormBuilder = new FormBuilder();
  const testingForm: FormGroup = formBuilder.group({
    productPurchaseQuantity: new FormControl(''),
    productStockQuantity: new FormControl('')
  });

  describe('#validate', () => {
    const parameters = [
      {
        description: 'should not have error | productPurchaseQuantity is blank',
        productPurchaseQuantity: '',
        productStockQuantity: 1,
        expectedErrorOfProductPurchaseQuantity: null
      },
      {
        description: 'should not have error | productPurchaseQuantity is null',
        productPurchaseQuantity: null,
        productStockQuantity: 1,
        expectedErrorOfProductPurchaseQuantity: null
      },
      {
        description: 'should not have error | productPurchaseQuantity is not numeric',
        productPurchaseQuantity: 'a',
        productStockQuantity: 1,
        expectedErrorOfProductPurchaseQuantity: null
      },
      {
        description: 'should not have error | productStockQuantity is blank',
        productPurchaseQuantity: 1,
        productStockQuantity: '',
        expectedErrorOfProductPurchaseQuantity: null
      },
      {
        description: 'should not have error | productStockQuantity is null',
        productPurchaseQuantity: 1,
        productStockQuantity: null,
        expectedErrorOfProductPurchaseQuantity: null
      },
      {
        description: 'should not have error | productStockQuantity is not numeric',
        productPurchaseQuantity: 1,
        productStockQuantity: 'a',
        expectedErrorOfProductPurchaseQuantity: null
      },
      {
        description: 'should not have error | productPurchaseQuantity less than productStockQuantity',
        productPurchaseQuantity: 1,
        productStockQuantity: 2,
        expectedErrorOfProductPurchaseQuantity: null
      },
      {
        description: 'should not have error | productPurchaseQuantity equals productStockQuantity',
        productPurchaseQuantity: 1,
        productStockQuantity: 1,
        expectedErrorOfProductPurchaseQuantity: null
      },
      {
        description: 'should have error | productPurchaseQuantity exceeds productStockQuantity',
        productPurchaseQuantity: 2,
        productStockQuantity: 1,
        expectedErrorOfProductPurchaseQuantity: true
      }
    ];
    parameters.forEach((parameter) => {
      it(parameter.description, () => {
        testingForm.setValue({
          productPurchaseQuantity: parameter.productPurchaseQuantity,
          productStockQuantity: parameter.productStockQuantity
        });
        const validatorFn = PurchaseQuantityStockQuantityValidator(LOCALE);
        validatorFn(testingForm);
        expect(testingForm.get(PRODUCT_PURCHASE_QUANTITY).getError('exceedStockError')).toEqual(
          parameter.expectedErrorOfProductPurchaseQuantity
        );
      });
    });
  });
});
