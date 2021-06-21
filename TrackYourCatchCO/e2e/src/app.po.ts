import { browser, by, element } from 'protractor';

export class AppPage {
  credentials: any;
  async navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl);
  }

  async getTitleText(): Promise<string> {
    return element(by.css('.navbar-brand')).getText();
  }

  async fillCredentials(): Promise<void> {
    await element(by.id('okta-signin-username')).sendKeys('testuser@bruff.net');
    await element(by.id('okta-signin-password')).sendKeys('T3sT123!');
    await element(by.id('okta-signin-submit')).click();
 }
}
