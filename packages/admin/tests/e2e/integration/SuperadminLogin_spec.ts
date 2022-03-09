describe("Super admin login", async () => {
  beforeEach(() => {
    cy.request(
      "post",
      "http://localhost:4004/protected/environment-arranger/clean-up"
    ).request(
      "post",
      "http://localhost:4004/protected/environment-arranger/arrange"
    );
  });
  it("Logs in as a superadmin", () => {
    cy.visit("/login");
    cy.testId("email-input").type("superadmin@picket.com");
    cy.testId("password-input").type("superadmin");
    cy.testId("submit-btn").click();
    cy.url().should("contain", "dashboard");
  });
});
