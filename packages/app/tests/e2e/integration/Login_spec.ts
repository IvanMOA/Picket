import * as faker from "faker";
describe("Login with phone number", () => {
  it("Logs in succesfully and gets redirected to home page", () => {
    const phoneNumber = faker.phone.phoneNumber("##########");
    cy.request(
      "post",
      "http://localhost:4004/protected/environment-arranger/clean-up"
    );
    cy.visit("/register");
    cy.register("Axel Ivan Morales Ortega", phoneNumber);
    cy.login(phoneNumber);
    cy.url().should("not.contain", "login");
  });
});
