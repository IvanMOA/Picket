/// <reference types="cypress" />
import "./commands";
declare global {
  namespace Cypress {
    interface Chainable {
      testId(value: string, opts?: any): Chainable<Element>;
      login(email: string, password: string): Chainable<Element>;
      createDependency(dependencyId: string, name: string): Chainable<Element>;
    }
  }
}
