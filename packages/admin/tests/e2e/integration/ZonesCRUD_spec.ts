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
    const args = {
      name: "Tigres vs America",
      description: "Tigres contra Rayados Primera Jornada",
      ticketsPerPerson: "2",
      place: "Gaspar Mass",
    };
    cy.login("axel.moraleso@uanl.mx", "123123");
    cy.testId("events-section-link").click();
    cy.testId("create-event-btn").click();
    cy.testId("name-input").type(args.name);
    cy.testId("description-input").type(args.description);
    cy.testId("tickets-per-person-input").clear().type(args.ticketsPerPerson);
    cy.testId("place-select").click();
    cy.contains(args.place).click();
    cy.testId("submit-btn").click();
    cy.get("table").should("contain", args.name);
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
});
