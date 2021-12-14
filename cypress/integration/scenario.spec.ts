import { DummyPurchasingPage } from 'cypress/page-objects/dummy-purchasing-page';
import { HeaderPage } from 'cypress/page-objects/header-page';
import { ProductListingPage } from 'cypress/page-objects/product-listing-page';
import { ProductRegisteringPage } from 'cypress/page-objects/product-registering-page';
import { PurchaseHistoryListingPage } from 'cypress/page-objects/purchase-history-listing-page';
import { SignInPage } from 'cypress/page-objects/sign-in-page';
import { StockRegisteringPage } from 'cypress/page-objects/stock-registering-page';
import { UrlConst } from 'cypress/page-objects/url-const';

const signInPage: SignInPage = new SignInPage();
const headerPage: HeaderPage = new HeaderPage();
const productListingPage: ProductListingPage = new ProductListingPage();
const productRegisteringPage: ProductRegisteringPage = new ProductRegisteringPage();
const stockRegisteringPage: StockRegisteringPage = new StockRegisteringPage();
const dummyPurchasingPage: DummyPurchasingPage = new DummyPurchasingPage();
const purchaseHistoryListingPage: PurchaseHistoryListingPage = new PurchaseHistoryListingPage();

const now = new Date().toISOString(); // 2022-01-01T12:00:00.000Z
const testDate = now
  .replace(/-/g, '/') // Replaces all hyphens to slashes.
  .substring(0, 10); // Cuts to length only for date → 2022/01/01

const productCode =
  'TEST' +
  now
    .replace(/-/g, '') // Removes all hyphens.
    .replace(/:/g, '') // Removes all colons.
    .replace('T', '') // Removes T.
    .substring(0, 14); //→ TEST20220101120000

const productName = 'Test Product Name';
const productPurchaseName = '藤田 茂平';

const VIEW_WIDTH = 1440;
const VIEW_HEIGHT = 900;

describe('#Senario1 User01 registers a new product and edits it', () => {
  beforeEach(() => {
    cy.viewport(VIEW_WIDTH, VIEW_HEIGHT);
  });

  it('Should register new product', () => {
    const productGenre = productRegisteringPage.TEST_ARGS.GENRE.SNEAKERS_AND_SHOES;
    const searchProductGenre = productListingPage.TEST_ARGS.GENRE.SNEAKERS_AND_SHOES;
    const productSizeStandard = '23,24,25,26,27,28';
    const newProductColor = 'White';
    const editProductColor = 'White,red';
    const newProductUnitPrice = '1000';
    const editProductUnitPrice = '1500';
    const userAccount = 'user01';
    const passWord = 'demo';

    // Signs in.
    signInPage.setupSignIn(userAccount, passWord).clickSignInButton();
    cy.url().should((url) => expect(url).equal(UrlConst.PATH_CONTEXT + UrlConst.PATH_PRODUCT_LISTING));

    // Clicks New button.
    productListingPage.clickNewButton();
    cy.url().should((url) => expect(url).equal(UrlConst.PATH_CONTEXT + UrlConst.PATH_PRODUCT_REGISTERING_NEW));

    // Registers the new product.
    productRegisteringPage
      .setupRegisterProduct(
        productCode,
        productName,
        productGenre,
        productSizeStandard,
        newProductColor,
        newProductUnitPrice,
        ''
      )
      .clickSaveButton();
    cy.url().should((url) => expect(url).equal(UrlConst.PATH_CONTEXT + UrlConst.PATH_PRODUCT_LISTING));

    // Searches the new product.
    productListingPage.setupSearchCriteria(productName, productCode, searchProductGenre, false).clickSearchButton();
    productListingPage.getSearchResultRows().should((rows) => expect(rows).to.have.lengthOf(1));

    // Edits the new product.
    productListingPage.clickSearchList(1);
    productRegisteringPage
      .setupEditProduct(productName, productGenre, productSizeStandard, editProductColor, editProductUnitPrice, '')
      .clickSaveButton();

    // Signs out.
    headerPage.clickSignOutButton();
    cy.url().should((url) => expect(url).equal(UrlConst.PATH_CONTEXT + UrlConst.PATH_SIGN_IN));
  });
});

describe('#Senario2 User02 adds stock of the new product', () => {
  const addProductStockQuantity = 50;
  const userAccount = 'user02';
  const passWord = 'demo';

  beforeEach(() => {
    cy.viewport(VIEW_WIDTH, VIEW_HEIGHT);
  });

  it('Should add stock of the new product', () => {
    // Signs in.
    signInPage.setupSignIn(userAccount, passWord).clickSignInButton();
    cy.url().should((url) => expect(url).equal(UrlConst.PATH_CONTEXT + UrlConst.PATH_PRODUCT_LISTING));

    // Moves to stock registering page
    headerPage.clickSubMenuStockRegistering();
    cy.url().should((url) => expect(url).equal(UrlConst.PATH_CONTEXT + UrlConst.PATH_STOCK_REGISTERING));

    // Adds stock of product.
    stockRegisteringPage.setupAddStockOfProduct(productCode, addProductStockQuantity).clickSaveButton();

    // Signs out.
    headerPage.clickSignOutButton();
    cy.url().should((url) => expect(url).equal(UrlConst.PATH_CONTEXT + UrlConst.PATH_SIGN_IN));
  });
});

describe('#Senario3 User99 purchases the new product(for testing)', () => {
  const productPurchaseName1 = '小野 重三郎';
  const productPurchaseName2 = '高野 圭織';
  const userAccount = 'user99';
  const passWord = 'demo';

  beforeEach(() => {
    cy.viewport(VIEW_WIDTH, VIEW_HEIGHT);
  });

  it('Should purchase the new product', () => {
    // Signs in.
    signInPage.setupSignIn(userAccount, passWord).clickSignInButton();
    cy.url().should((url) => expect(url).equal(UrlConst.PATH_CONTEXT + UrlConst.PATH_PRODUCT_LISTING));

    // Moves to purchase registering page.
    headerPage.clickSubMenuDummyPurchasing();
    cy.url().should((url) => expect(url).equal(UrlConst.PATH_CONTEXT + UrlConst.PATH_DUMMY_PURCHASING));

    // Purchases the new product.
    dummyPurchasingPage.setupPurchaseOfProduct(productCode, productPurchaseName, 1).clickSaveButton();
    dummyPurchasingPage.setupPurchaseOfProduct(productCode, productPurchaseName1, 1).clickSaveButton();
    dummyPurchasingPage.setupPurchaseOfProduct(productCode, productPurchaseName2, 48).clickSaveButton();

    // Signs out.
    headerPage.clickSignOutButton();
    cy.url().should((url) => expect(url).equal(UrlConst.PATH_CONTEXT + UrlConst.PATH_SIGN_IN));
  });
});

describe('#Senario4 User01 checks the purchase history of the product', () => {
  const userAccount = 'user01';
  const passWord = 'demo';

  beforeEach(() => {
    cy.viewport(VIEW_WIDTH, VIEW_HEIGHT);
  });

  it('Should confirm purchase history of the new product', () => {
    // Signs in.
    signInPage.setupSignIn(userAccount, passWord).clickSignInButton();
    cy.url().should((url) => expect(url).equal(UrlConst.PATH_CONTEXT + UrlConst.PATH_PRODUCT_LISTING));

    // Moves to purchase listing page.
    headerPage.clickSubMenuPurchaseHistoryListing();
    cy.url().should((url) => expect(url).equal(UrlConst.PATH_CONTEXT + UrlConst.PATH_PURCHASE_HISTORY_LISTING));

    // Confirms purchase history of the new product.
    purchaseHistoryListingPage
      .setupSearchCriteria(productPurchaseName, testDate, testDate, productName, productCode)
      .clickSearchButton();
    purchaseHistoryListingPage.getSearchResultRows().should((rows) => expect(rows).to.have.lengthOf(1));

    purchaseHistoryListingPage
      .clickClearButton()
      .setupSearchCriteria('', testDate, testDate, productName, productCode)
      .clickSearchButton();
    purchaseHistoryListingPage.getSearchResultRows().should((rows) => expect(rows).to.have.lengthOf(3));

    // Signs out.
    headerPage.clickSignOutButton();
    cy.url().should((url) => expect(url).equal(UrlConst.PATH_CONTEXT + UrlConst.PATH_SIGN_IN));
  });
});
