Cypress.Commands.add("dataCy", (value, opts?: any) => {
  cy.get(`[data-cy=${value}]`, opts ?? {});
});
Cypress.Commands.add("register", (name, phoneNumber) => {});
Cypress.Commands.add("login", (phoneNumber) => {});
