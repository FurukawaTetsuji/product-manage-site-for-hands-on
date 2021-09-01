import { UrlConst } from './url-const';

export class SignInPage {
  private TEST_IDS = {
    SIGN_IN_USER_ACCOUNT: '#signin-user-account',
    SIGN_IN_USER_PASSWORD: '#signin-user-password',
    SIGN_IN_BTN: '#sign-in-button'
  };

  /**
   * Visits sign in page
   */
  visit() {
    cy.visit(UrlConst.PATH_CONTEXT + UrlConst.PATH_SIGN_IN);
  }

  /**
   * Clicks sign in button
   * @returns SignInPage
   */
  clickSignInButton(): SignInPage {
    cy.get(this.TEST_IDS.SIGN_IN_BTN).click();
    return this;
  }

  /**
   * Setups sign in
   * @param signInUserAccount sign in user account
   * @param signInUserPassword sign in user password
   * @returns SignInPage
   */
  setupSignIn(signInUserAccount: string, signInUserPassword: string): SignInPage {
    this.visit();
    cy.get(this.TEST_IDS.SIGN_IN_USER_ACCOUNT).type(signInUserAccount);
    cy.get(this.TEST_IDS.SIGN_IN_USER_PASSWORD).type(signInUserPassword);
    return this;
  }
}
