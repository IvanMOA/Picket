/// <reference types="cypress" />
import "./commands";
declare global {
  namespace Cypress {
    interface Chainable {
      testId(value: string, opts?: any): Chainable<Element>;
      dataCy(value: string, opts?: any): Chainable<Element>;
      register(name: string, phoneNumber: string): Chainable<Element>;
      login(phoneNumber: string): Chainable<Element>;
    }
  }
}
