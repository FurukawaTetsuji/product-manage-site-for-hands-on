import { FormattedNumberPipe } from 'src/app/core/pipes/formatted-number.pipe';

import { UntypedFormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

const PRODUCT_STOCK_QUANTITY = 'productStockQuantity';
const PRODUCT_PURCHASE_QUANTITY = 'productPurchaseQuantity';

export function PurchaseQuantityStockQuantityValidator(locale: string): ValidatorFn {
  return (control: UntypedFormGroup): ValidationErrors | null => {
    const productStockQuantity: string = control.get(PRODUCT_STOCK_QUANTITY).value;
    const productPurchaseQuantity: string = control.get(PRODUCT_PURCHASE_QUANTITY).value;
    if (!productStockQuantity || !productPurchaseQuantity) {
      return null;
    }

    const formattedNumberPipe: FormattedNumberPipe = new FormattedNumberPipe();
    const numProductStockQuantity = Number(formattedNumberPipe.parse(productStockQuantity, locale));
    const numProductPurchaseQuantity = Number(formattedNumberPipe.parse(productPurchaseQuantity, locale));
    if (!Number.isFinite(numProductStockQuantity) || !Number.isFinite(numProductPurchaseQuantity)) {
      return null;
    }
    if (numProductPurchaseQuantity <= numProductStockQuantity) {
      return null;
    }

    const validateError = { exceedStockError: true };
    control.get(PRODUCT_PURCHASE_QUANTITY).setErrors(validateError);
    return validateError;
  };
}
