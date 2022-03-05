describe("Super admin login", () => {
  it("Logs in as a superadmin", () => {
    cy.visit("/login");
    cy.testId("email-input").type("superadmin@picket.com");
    cy.testId("password-input").type("password");
    cy.url().should("contain", "dashboard");
  });
});
