describe("Register with phone number", () => {
    it("Registers succesfully and gets redirected to login page", () => {
        cy.request("post", "http://localhost:4004/protected/environment-arranger/clean-up")
        cy.visit("/register")
        cy.register('Axel Ivan Morales Ortega', '8124337743')
        cy.url().should('include', 'login')
    })
})