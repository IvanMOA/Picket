import * as faker from "faker";
describe("Auth routes", () => {
  beforeEach(() => {
    cy.request(
      "post",
      "http://localhost:4004/protected/environment-arranger/clean-up"
    );
  });
  it("Only lets guest users to visit only public or public routes but not private ones", () => {
    cy.visit("/") // Private route
      .url()
      .should("contain", "login");
    cy.visit("/about") // Public route
      .url()
      .should("contain", "about");
    cy.visit("/register") // Only public route
      .url()
      .should("contain", "register");
  });
  it("Only lets logged in users to visit private or public routes but not only public ones", () => {
    const phoneNumber = faker.phone.phoneNumber("##########");
    cy.visit("/register")
      .register("Axel Ivan Morales Ortega", phoneNumber)
      .login(phoneNumber)
      .url()
      .should("not.contain", "login");
    cy.visit("/login/ask-for-verification-code") // Only public route
      .url()
      .should("not.contain", "login");
    cy.visit("/about") // Public route
      .url()
      .should("contain", "about");
    cy.visit("/") // Private route
      .url()
      .should("eq", Cypress.config().baseUrl + "/");
  });
  it("Shows a loading screen while it checks if there's a user logged in for private routes", () => {
    cy.visit("/");
    cy.dataCy("loading-screen");
    cy.url().should("contain", "login");
  });
  it("Shows a loading screen while it checks if there's a user logged in for only public routes", () => {
    cy.visit("/register");
    cy.dataCy("loading-screen");
    cy.url().should("contain", "register");
  });
  it("Does not show a loading screen for public routes", () => {
    cy.visit("/about");
    cy.dataCy("loading-screen", { timeout: 0 }).should("not.exist");
    cy.url().should("contain", "about");
  });
});
