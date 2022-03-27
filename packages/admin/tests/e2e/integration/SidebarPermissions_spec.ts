import { esLocale } from "../../../src/config/i18n/locales/es";
describe("Sidebar permissions", async () => {
  beforeEach(() => {
    cy.request(
      "post",
      "http://localhost:4004/protected/environment-arranger/clean-up"
    ).request(
      "post",
      "http://localhost:4004/protected/environment-arranger/arrange"
    );
  });
  it("Only sees statistics, users of the same dependency", () => {
    cy.login("axel.moraleso@uanl.mx", "123123");
    cy.testId("statistics-section-link");
    cy.testId("users-section-link").click();
    cy.get("table")
      .should("contain", "axel.moraleso@uanl.mx")
      .should("not.contain", "superadmin");
    cy.testId("dependencies-section-link").should("not.exist");
    cy.testId("events-section-link");
  });
});
