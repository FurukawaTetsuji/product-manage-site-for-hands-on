export class StockRegisteringPage {
  private TEST_IDS = {
    PRODUCT_CODE: '#product-code',
    ADD_PRODUCT_STOCK_QUANTITY: '#add-product-stock-quantity',
    SAVE_BUTTON: '#save-button',
    YES_NO_DIALOG_BUTTON_YES: '#yesNoDialog_button_yes'
  };

  /**
   * Clicks save button
   * @returns StockRegisteringPage
   */
  clickSaveButton(): StockRegisteringPage {
    cy.get(this.TEST_IDS.SAVE_BUTTON).click();
    cy.get(this.TEST_IDS.YES_NO_DIALOG_BUTTON_YES).click();
    return this;
  }

  /**
   * Setups add stock of product
   * @param productCode product code
   * @param addProductStockQuantity add product stock quantity
   * @returns StockRegisteringPage
   */
  setupAddStockOfProduct(productCode: string, addProductStockQuantity: number): StockRegisteringPage {
    cy.get(this.TEST_IDS.PRODUCT_CODE).type(productCode);
    cy.get(this.TEST_IDS.ADD_PRODUCT_STOCK_QUANTITY).type(addProductStockQuantity.toString());
    return this;
  }
}
