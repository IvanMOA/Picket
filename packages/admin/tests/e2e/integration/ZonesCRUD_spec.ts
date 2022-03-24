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
  it("Creates a zone", () => {
    cy.login("axel.moraleso@uanl.mx", "123123");
    cy.createEvent({
      name: "Tigres vs America",
      description: "Tigres contra Rayados Primera Jornada",
      ticketsPerPerson: "2",
      place: "Gaspar Mass",
    });
    cy.get("table").should("contain", "Tigres vs America");
    cy.testId("zones-link").click();
    cy.testId("create-zone-btn").click({ force: true });
    cy.testId("name-input").type("New zone");
    cy.testId("capacity-input").type("100");
    cy.testId("submit-btn").click();
    cy.get(".el-pager").within(() => {
      cy.contains("3").click();
    });
    cy.get("table").should("contain", "New zone");
  });
  it.only("Updates a zone", () => {
    cy.login("axel.moraleso@uanl.mx", "123123");
    cy.createEvent({
      name: "Tigres vs America",
      description: "Tigres contra Rayados Primera Jornada",
      ticketsPerPerson: "2",
      place: "Gaspar Mass",
    });
    cy.get("table").should("contain", "Tigres vs America");
    cy.testId("zones-link").click();
    cy.testId("update-zone-btn").eq(1).click();
    cy.testId("name-input").clear().type("A new section");
    cy.testId("capacity-input").clear().type("320");
    cy.testId("submit-btn").click();
    cy.get("table").should("contain", "A new section");
    cy.get("table").should("contain", "320");
  });
});