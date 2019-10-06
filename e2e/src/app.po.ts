import { browser, by, element } from 'protractor';

export class AppPage {
  public navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  public getTitleText() {
    return element(by.css('atm-root h3.is-3')).getText() as Promise<string>;
  }
}
