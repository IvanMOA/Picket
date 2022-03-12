Cypress.Commands.add("testId", (value, opts?: any) => {
  cy.get(`[data-testid=${value}]`, opts ?? {});
});
Cypress.Commands.add("login", (email, password) => {
  cy.visit("/login");
  cy.testId("email-input").type(email);
  cy.testId("password-input").type(password);
  cy.testId("submit-btn").click();
});
