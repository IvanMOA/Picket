import * as faker from "faker";
import { esLocale } from "../../../src/config/i18n/locales/es";
describe("Book tickets", () => {
  it("Books tickets", () => {
    const phoneNumber = faker.phone.phoneNumber("##########");
    cy.request(
      "post",
      "http://localhost:4004/protected/environment-arranger/clean-up"
    );
    cy.request(
      "post",
      "http://localhost:4004/protected/environment-arranger/arrange"
    );
    cy.visit("/register");
    cy.register("Axel Ivan Morales Ortega", phoneNumber);
    cy.login(phoneNumber);
    cy.contains("div", "Auténticos vs Liebres").within(() => {
      cy.get("button").click();
    });
    cy.testId("quantity-input").clear().type("2");
    cy.testId("zones-select").click();
    cy.contains("Sección 1").click();
    cy.testId("submit-btn").click();
    cy.contains(esLocale.created.tickets.title);
    cy.url().should("contain", "tickets");
    cy.contains("Auténticos vs Liebres").should("have.length", 2);
  });
});
