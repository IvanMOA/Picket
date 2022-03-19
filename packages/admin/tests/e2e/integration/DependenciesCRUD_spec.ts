import { waitFor } from "@testing-library/vue";
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
  it("Creates a dependency", () => {
    cy.login("superadmin@picket.com", "superadmin");
    const dependencyName = "Facultad de Ingeniería Mecánica y Eléctrica";
    cy.createDependency("23161", dependencyName);
    cy.contains(dependencyName);
    cy.findByRole("alert").contains(esLocale.created.dependency.title);
  });
  it("Deletes a dependency", () => {
    cy.login("superadmin@picket.com", "superadmin");
    const dependencyName = "Facultad de Ingeniería Mecánica y Eléctrica";
    cy.createDependency("23161", dependencyName);
    cy.testId("delete-dependency-btn").eq(1).click();
    cy.testId("submit-btn").click();
    cy.testId("delete-dependency-btn", { timeout: 10000 }).should(
      "have.length",
      1
    );
    cy.should("not.contain", dependencyName);
    cy.contains(esLocale.deleted.dependency.title);
  });
  it("Updates a dependency", () => {
    cy.login("superadmin@picket.com", "superadmin");
    const dependencyName = "Facultad de Ingeniería Mecánica y Eléctrica";
    cy.createDependency("23161", dependencyName);
    cy.testId("edit-dependency-btn", { timeout: 10000 }).eq(1).click();
    const newDependencyName = "Facultad de Ciencias de la Comunicación";
    cy.testId("name-input").clear().type(newDependencyName);
    cy.testId("submit-btn").click();
    cy.get("table").should("contain", newDependencyName);
    cy.contains(esLocale.updated.dependency.title);
  });
});
