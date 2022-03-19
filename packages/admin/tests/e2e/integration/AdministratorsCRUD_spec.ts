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
    const email = "anadmin@gmail.com";
    const password = "123123";
    cy.createAdministrator({
      name: "Juan Garza",
      email,
      password,
      role: "Superadmin",
      dependencyName: "Superadmins",
    });
    cy.contains(esLocale.created.administrator.title);
    cy.contains("anadmin@gmail.com");
    cy.logout();
    cy.login(email, password);
    cy.url().should("contain", "dashboard");
  });
  it.only("Deletes a superadmin", () => {
    cy.login("superadmin@picket.com", "superadmin");
    const email = "anadmin@gmail.com";
    const password = "123123";
    cy.createAdministrator({
      name: "Juan Garza",
      email,
      password,
      role: "Superadmin",
      dependencyName: "Superadmins",
    });
    cy.contains(esLocale.created.administrator.title);
    cy.contains("anadmin@gmail.com");
    cy.testId("delete-administrator-btn").eq(1).click();
    cy.testId("submit-btn").click();
    cy.should("not.contain", email);
    cy.logout();
    cy.login(email, password);
    cy.url().should("contain", "login");
  });
});
