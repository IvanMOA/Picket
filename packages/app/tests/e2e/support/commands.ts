Cypress.Commands.add("dataCy", (value, opts?: any) => {
  cy.get(`[data-cy=${value}]`, opts ?? {});
});
Cypress.Commands.add("testId", (value, opts?: any) => {
  cy.get(`[data-testid=${value}]`, opts ?? {});
});
Cypress.Commands.add("register", (name, phoneNumber) => {
  cy.testId("name-input").type(name);
  cy.testId("phone-number-input").type(phoneNumber);
  cy.testId("submit-btn").click();
});
Cypress.Commands.add("login", (phoneNumber) => {
  cy.testId("phone-number-input").type(phoneNumber);
  cy.testId("submit-btn").click();
  cy.wait(1000);
  cy.request(
    "get",
    `http://localhost:4004/protected/verification-code?phone_number=${encodeURIComponent(
      phoneNumber
    )}`
  ).then((res) => {
    cy.testId("verification-code-input").type(res.body.verification_code);
    cy.testId("submit-btn").click();
  });
});
