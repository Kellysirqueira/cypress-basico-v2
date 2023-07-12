const randomstring = require("randomstring");
Cypress.Commands.add('fillMandatoryFieldsAndSubimit', () => { 
  const user = {}
  user.username = randomstring.generate();
  user.lastname = randomstring.generate();
  user.email = (randomstring.generate(8)+'@email.com');
  user.phone = randomstring.generate({ length: 9, charset: ['numeric']})

  cy.get('#firstName').type(user.username, ({ delay: 0 })).should('be.visible', 'success');
  cy.get('#lastName').type(user.lastname, ({ delay: 0 })).should('be.visible', 'success');
  cy.get('#email').type(user.email, ({ delay: 0 })).should('be.visible', 'success')
  cy.get('#phone').type(user.phone, ({ delay: 0 })).should('be.visible', 'success')
  cy.get('#phone-checkbox').should('be.visible', 'success')
  cy.get('#open-text-area').type(randomstring.generate(), ({ delay: 0 })).should('be.visible', 'success')
  cy.get('button[type="submit"]').click()
})