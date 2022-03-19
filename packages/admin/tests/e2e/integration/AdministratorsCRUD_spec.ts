import { esLocale } from "../../../src/config/i18n/locales/es";
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
    cy.testId("users-section-link").click();
    cy.testId("create-administrator-btn").click();
    const email = "anadmin@gmail.com";
    const password = "123123";
    cy.testId("name-input").type("Juan Garza Martínez");
    cy.testId("email-input").type(email);
    cy.testId("password-input").type(password);
    cy.testId("confirmation-password-input").type(password);
    cy.testId("dependency-select").click().type("{downArrow}{enter}");
    cy.testId("role-select").click().type("{downArrow}{enter}");
    cy.testId("submit-btn").click();
    cy.contains(esLocale.created.administrator.title);
    cy.contains("anadmin@gmail.com");
    cy.logout();
    cy.login(email, password);
    cy.url().should("contain", "dashboard");
  });
});
