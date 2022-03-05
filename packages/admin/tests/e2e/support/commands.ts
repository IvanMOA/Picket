Cypress.Commands.add("testId", (value, opts?: any) => {
  cy.get(`[data-testid=${value}]`, opts ?? {});
});
Cypress.Commands.add("register", (name, phoneNumber) => {});
Cypress.Commands.add("login", (phoneNumber) => {});
