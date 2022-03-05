/// <reference types="cypress" />
import "./commands";
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      testId(value: string, opts?: any): Chainable<Element>;
      register(name: string, phoneNumber: string): Chainable<Element>;
      login(phoneNumber: string): Chainable<Element>;
    }
  }
}
