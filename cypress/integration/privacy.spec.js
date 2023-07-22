Cypress._.times(10, function () {

  it('Test the Privacy Policy page on an independent way', () => {
    cy.visit('./src/privacy.html')
    cy.contains('Talking About Testing').should('be.visible')
  })

})

