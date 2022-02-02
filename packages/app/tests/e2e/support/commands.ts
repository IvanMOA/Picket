Cypress.Commands.add('dataCy', (value) => {
    cy.get(`[data-cy=${value}]`)
})
Cypress.Commands.add('register', (name, phoneNumber) => {
    cy.dataCy('name-input').type(name)
    cy.dataCy('phone-number-input').type(phoneNumber)
    cy.dataCy('submit-btn').click()
})
Cypress.Commands.add('login',  (phoneNumber) => {
    cy.dataCy('phone-number-input').type(phoneNumber)
    cy.dataCy('submit-btn').click()
    cy.wait(1000)
    cy.request('get', `http://localhost:4004/protected/verification-code?phone_number=${encodeURIComponent(phoneNumber)}`)
        .then( res => {
            cy.dataCy('verification-code-input').type(res.body.verification_code)
            cy.dataCy('submit-btn').click()
            cy.url().should('not.contain', 'login')
        })
})