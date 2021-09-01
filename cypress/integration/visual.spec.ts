import { HeaderPage } from 'cypress/page-objects/header-page';
import { ProductListingPage } from 'cypress/page-objects/product-listing-page';
import { SignInPage } from 'cypress/page-objects/sign-in-page';
import { UrlConst } from 'cypress/page-objects/url-const';

const signInPage: SignInPage = new SignInPage();
const headerPage: HeaderPage = new HeaderPage();
const productListingPage: ProductListingPage = new ProductListingPage();

const VIEW_WIDTH = 1440;
const VIEW_HEIGHT = 900;
const userAccount = 'user99';
const passWord = 'demo';

describe('#Visual test Sign-in-page', () => {
  beforeEach(() => {
    cy.viewport(VIEW_WIDTH, VIEW_HEIGHT);
  });

  it('Should display screen correctly', () => {
    signInPage.visit();
    cy.url().should((url) => expect(url).equal(UrlConst.PATH_CONTEXT + UrlConst.PATH_SIGN_IN));
    cy.matchImageSnapshot();
  });
});

describe('#Visual test product-listing-page', () => {
  beforeEach(() => {
    cy.viewport(VIEW_WIDTH, VIEW_HEIGHT);
  });

  it('Should display screen correctly', () => {
    // Signs in.
    signInPage.setupSignIn(userAccount, passWord).clickSignInButton();
    cy.url().should((url) => expect(url).equal(UrlConst.PATH_CONTEXT + UrlConst.PATH_PRODUCT_LISTING));
    cy.matchImageSnapshot();
  });
});

describe('#Visual test product-registering-page', () => {
  beforeEach(() => {
    cy.viewport(VIEW_WIDTH, VIEW_HEIGHT);
  });

  it('Should display screen correctly', () => {
    // Signs in.
    signInPage.setupSignIn(userAccount, passWord).clickSignInButton();
    cy.url().should((url) => expect(url).equal(UrlConst.PATH_CONTEXT + UrlConst.PATH_PRODUCT_LISTING));

    // Clicks New button.
    productListingPage.clickNewButton();
    cy.url().should((url) => expect(url).equal(UrlConst.PATH_CONTEXT + UrlConst.PATH_PRODUCT_REGISTERING_NEW));
    cy.matchImageSnapshot();
  });
});

describe('#Visual test stock-registering-page', () => {
  beforeEach(() => {
    cy.viewport(VIEW_WIDTH, VIEW_HEIGHT);
  });

  it('Should display screen correctly', () => {
    // Signs in.
    signInPage.setupSignIn(userAccount, passWord).clickSignInButton();
    cy.url().should((url) => expect(url).equal(UrlConst.PATH_CONTEXT + UrlConst.PATH_PRODUCT_LISTING));

    // Moves to stock registering page
    headerPage.clickSubMenuStockRegistering();
    cy.url().should((url) => expect(url).equal(UrlConst.PATH_CONTEXT + UrlConst.PATH_STOCK_REGISTERING));
    cy.matchImageSnapshot();
  });
});

describe('#Visual test dummy-purchasing-page', () => {
  beforeEach(() => {
    cy.viewport(VIEW_WIDTH, VIEW_HEIGHT);
  });

  it('Should display screen correctly', () => {
    // Signs in.
    signInPage.setupSignIn(userAccount, passWord).clickSignInButton();
    cy.url().should((url) => expect(url).equal(UrlConst.PATH_CONTEXT + UrlConst.PATH_PRODUCT_LISTING));

    // Moves to purchase registering page.
    headerPage.clickSubMenuDummyPurchasing();
    cy.url().should((url) => expect(url).equal(UrlConst.PATH_CONTEXT + UrlConst.PATH_DUMMY_PURCHASING));
    cy.matchImageSnapshot();
  });
});

describe('#Visual test purchase-history-listing-page', () => {
  beforeEach(() => {
    cy.viewport(VIEW_WIDTH, VIEW_HEIGHT);
  });

  it('Should display screen correctly', () => {
    // Signs in.
    signInPage.setupSignIn(userAccount, passWord).clickSignInButton();
    cy.url().should((url) => expect(url).equal(UrlConst.PATH_CONTEXT + UrlConst.PATH_PRODUCT_LISTING));

    // Moves to purchase listing page.
    headerPage.clickSubMenuPurchaseHistoryListing();
    cy.url().should((url) => expect(url).equal(UrlConst.PATH_CONTEXT + UrlConst.PATH_PURCHASE_HISTORY_LISTING));
    cy.matchImageSnapshot();
  });
});
