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
  it("Creates a superadmin", () => {
    cy.login("superadmin@picket.com", "superadmin");
    cy.testId("superadmins-section-link").click();
    // cy.testId("create-administrator").click()
    // cy.testId("email-input").type("anadmin")
  });
});
