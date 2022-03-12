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
    cy.login("superadmin@picket.com", "superadmin");
    cy.testId("superadmins-section-link").click();
  });
});
