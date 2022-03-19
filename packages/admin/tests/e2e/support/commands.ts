import "@testing-library/cypress/add-commands";
Cypress.Commands.add("testId", (value, opts?: any) => {
  cy.get(`[data-testid=${value}]`, opts ?? {});
});
Cypress.Commands.add("login", (email, password) => {
  cy.visit("/login");
  cy.testId("email-input").type(email);
  cy.testId("password-input").type(password);
  cy.testId("submit-btn").click();
});
Cypress.Commands.add("logout", () => {
  cy.testId("profile-btn").click();
  cy.testId("logout-btn").click();
});
Cypress.Commands.add("createDependency", (dependencyId, name) => {
  cy.testId("dependencies-link").click();
  cy.testId("create-dependency-btn").click();
  cy.testId("dependency-id-input").type(dependencyId);
  cy.testId("name-input").type(name);
  cy.testId("submit-btn").click();
});
Cypress.Commands.add("createAdministrator", (args) => {
  cy.testId("users-section-link").click();
  cy.testId("create-administrator-btn").click();
  cy.testId("name-input").type(args.name);
  cy.testId("email-input").type(args.email);
  cy.testId("password-input").type(args.password);
  cy.testId("confirmation-password-input").type(args.password);
  cy.testId("role-select").click();
  cy.contains(args.role).click();
  cy.testId("dependency-select").click();
  cy.contains(args.dependencyName).click();
  cy.testId("submit-btn").click();
});
Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});
