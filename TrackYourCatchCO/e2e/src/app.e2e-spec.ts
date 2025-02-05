import { watchFile } from 'fs';
import { browser, logging } from 'protractor';
import { AppPage } from './app.po';
import { by, element } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display correct app title', async () => {
    await page.navigateTo();
    expect(await page.getTitleText()).toEqual('TrackYourCatchCO');
  });

  it('should log into the application', async () => {
    await page.navigateTo();
    expect(await page.getTitleText()).toEqual('TrackYourCatchCO');
    await page.fillCredentials();
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
