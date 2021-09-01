export class HeaderPage {
  private TEST_IDS = {
    MENU: {
      MENU_PRODUCT: '#menu-product',
      MENU_PURCHASE: '#menu-purchase',
      MENU_STOCK: '#menu-stock'
    },
    SUBMENU: {
      SUB_MENU_PRODUCT_LISTING: '#subMenu-product-listing',
      SUB_MENU_PURCHASE_HISTORY_LISTING: '#subMenu-purchase-history-listing',
      SUB_MENU_DUMMY_PURCHASING: '#subMenu-dummy-purchasing',
      SUB_MENU_STOCK_REGISTERING: '#subMenu-stock-registering'
    },
    SIGN_OUT_BUTTON: '#sign-out-button',
    YES_NO_DIALOG_BUTTON_YES: '#yesNoDialog_button_yes'
  };

  /**
   * Clicks sub menu product listing
   * @returns HeaderPage
   */
  clickSubMenuProductListing(): HeaderPage {
    cy.get(this.TEST_IDS.MENU.MENU_PRODUCT).click();
    cy.get(this.TEST_IDS.SUBMENU.SUB_MENU_PRODUCT_LISTING).click();
    return this;
  }

  /**
   * Clicks sub menu purchase history listing
   * @returns HeaderPage
   */
  clickSubMenuPurchaseHistoryListing(): HeaderPage {
    cy.get(this.TEST_IDS.MENU.MENU_PURCHASE).click();
    cy.get(this.TEST_IDS.SUBMENU.SUB_MENU_PURCHASE_HISTORY_LISTING).click();
    return this;
  }

  /**
   * Clicks sub menu dummy purchasing
   * @returns HeaderPage
   */
  clickSubMenuDummyPurchasing(): HeaderPage {
    cy.get(this.TEST_IDS.MENU.MENU_PURCHASE).click();
    cy.get(this.TEST_IDS.SUBMENU.SUB_MENU_DUMMY_PURCHASING).click();
    return this;
  }

  /**
   * Clicks sub menu stock registering
   * @returns HeaderPage
   */
  clickSubMenuStockRegistering(): HeaderPage {
    cy.get(this.TEST_IDS.MENU.MENU_STOCK).click();
    cy.get(this.TEST_IDS.SUBMENU.SUB_MENU_STOCK_REGISTERING).click();
    return this;
  }

  /**
   * Clicks sign out button
   * @returns HeaderPage
   */
  clickSignOutButton(): HeaderPage {
    cy.get(this.TEST_IDS.SIGN_OUT_BUTTON).click();
    cy.get(this.TEST_IDS.YES_NO_DIALOG_BUTTON_YES).click();
    return this;
  }
}
