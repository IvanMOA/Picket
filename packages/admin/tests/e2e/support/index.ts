/// <reference types="cypress" />
import "./commands";
declare global {
  namespace Cypress {
    interface Chainable {
      testId(value: string, opts?: any): Chainable<Element>;
      login(email: string, password: string): Chainable<Element>;
      logout(): Chainable<Element>;
      createDependency(dependencyId: string, name: string): Chainable<Element>;
      createAdministrator(args: {
        name: string;
        email: string;
        password: string;
        role: string;
        dependencyName: string;
      });
      createEvent(args: {
        name: string;
        description: string;
        ticketsPerPerson: string;
        place: string;
      });
    }
  }
}
