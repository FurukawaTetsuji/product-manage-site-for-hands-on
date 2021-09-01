export class DummyPurchasingPage {
  private TEST_IDS = {
    PRODUCT_CODE: '#product-code',
    PRODUCT_PURCHASE_NAME: '#product-Purchase-name',
    PRODUCT_PURCHASE_QUANTITY: '#product-purchase-quantity',
    SAVE_BUTTON: '#save-button',
    YES_NO_DIALOG_BUTTON_YES: '#yesNoDialog_button_yes'
  };

  /**
   * Clicks save button
   * @returns DummyPurchasingPage
   */
  clickSaveButton(): DummyPurchasingPage {
    cy.get(this.TEST_IDS.SAVE_BUTTON).click();
    cy.get(this.TEST_IDS.YES_NO_DIALOG_BUTTON_YES).click();
    return this;
  }

  /**
   * Setups purchase of product
   * @param productCode product code
   * @param productPurchaseName product purchase name
   * @param productPurchaseQuantity product purchase quantity
   * @returns DummyPurchasingPage
   */
  setupPurchaseOfProduct(
    productCode: string,
    productPurchaseName: string,
    productPurchaseQuantity: number
  ): DummyPurchasingPage {
    cy.get(this.TEST_IDS.PRODUCT_CODE).clear();

    cy.get(this.TEST_IDS.PRODUCT_CODE).type(productCode);
    cy.get(this.TEST_IDS.PRODUCT_PURCHASE_NAME).type(productPurchaseName);
    cy.get(this.TEST_IDS.PRODUCT_PURCHASE_QUANTITY).type(productPurchaseQuantity.toString());
    return this;
  }
}
