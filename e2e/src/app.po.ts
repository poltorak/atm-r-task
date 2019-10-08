import { browser, by, element } from 'protractor';

export class AppPage {
  public navigateTo(): Promise<any> {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  public getTitleText(): Promise<string> {
    return element(by.css('atm-root h3.is-3')).getText() as Promise<string>;
  }
}
