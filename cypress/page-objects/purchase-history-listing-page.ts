const SELECTOR_FOR_MAT_DATE_PICKER =
  ' > form > mat-form-field > div > div.mat-form-field-flex > div.mat-form-field-infix > input';

export class PurchaseHistoryListingPage {
  private TEST_IDS = {
    PRODUCT_PURCHASE_NAME: '#product-purchase-name',
    PRODUCT_PURCHASE_DATE_FROM: '#product-purchase-date-from' + SELECTOR_FOR_MAT_DATE_PICKER,
    PRODUCT_PURCHASE_DATE_TO: '#product-purchase-date-to' + SELECTOR_FOR_MAT_DATE_PICKER,
    PRODUCT_NAME: '#product-name',
    PRODUCT_CODE: '#product-code',
    SEARCH_RESULT: '.search-results > tbody > tr',
    CLEAR_BUTTON: '#clear-button',
    SEARCH_BUTTON: '#search-button'
  };

  /**
   * Clicks clear button
   * @returns PurchaseHistoryListingPage
   */
  clickClearButton(): PurchaseHistoryListingPage {
    cy.get(this.TEST_IDS.CLEAR_BUTTON).click();
    return this;
  }

  /**
   * Clicks search button
   * @returns PurchaseHistoryListingPage
   */
  clickSearchButton(): PurchaseHistoryListingPage {
    cy.get(this.TEST_IDS.SEARCH_BUTTON).click();
    return this;
  }

  /**
   * Clicks search list
   * @param rowNo row no
   * @returns PurchaseHistoryListingPage
   */
  clickSearchList(rowNo: number): PurchaseHistoryListingPage {
    cy.get(this.TEST_IDS.SEARCH_RESULT + ':nth-child(' + rowNo.toString() + ')').click();
    return this;
  }

  /**
   * Params purchase history listing page
   * @param productPurchaseName product purchase name
   * @param productPurchaseDateFrom product purchase date from
   * @param productPurchaseDateTo product purchase date to
   * @param productName product name
   * @param productCode product code
   * @returns PurchaseHistoryListingPage
   */
  setupSearchCriteria(
    productPurchaseName: string,
    productPurchaseDateFrom: string,
    productPurchaseDateTo: string,
    productName: string,
    productCode: string
  ): PurchaseHistoryListingPage {
    if (productPurchaseName) {
      cy.get(this.TEST_IDS.PRODUCT_PURCHASE_NAME).type(productPurchaseName);
    }
    if (productPurchaseDateFrom) {
      cy.get(this.TEST_IDS.PRODUCT_PURCHASE_DATE_FROM).type(productPurchaseDateFrom);
    }
    if (productPurchaseDateTo) {
      cy.get(this.TEST_IDS.PRODUCT_PURCHASE_DATE_TO).type(productPurchaseDateTo);
    }
    if (productName) {
      cy.get(this.TEST_IDS.PRODUCT_NAME).type(productName);
    }
    if (productCode) {
      cy.get(this.TEST_IDS.PRODUCT_CODE).type(productCode);
    }
    return this;
  }

  /**
   * Gets search result rows
   * @returns search result rows
   */
  getSearchResultRows(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.TEST_IDS.SEARCH_RESULT);
  }
}
