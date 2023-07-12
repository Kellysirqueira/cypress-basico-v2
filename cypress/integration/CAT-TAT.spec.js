/// <reference types="Cypress" />
const randomstring = require("randomstring");

describe('Central de Atendimento ao Cliente TAT', function() {
  
  const user = {}
  beforeEach(() => {
    cy.visit('./src/index.html');
    user.username = randomstring.generate();
    user.lastname = randomstring.generate();
    user.email = (randomstring.generate(8)+'@email.com');
    user.phone = randomstring.generate({ length: 9, charset: ['numeric']})
    });
  
  it('Verifies the application title', function() {
    cy.title().should('equal', 'Central de Atendimento ao Cliente TAT');
  })

  it.only('Fill the mandatory fields and send the form', () => {
    cy.get('#firstName').type(user.username, ({ delay: 0 })).should('be.visible', 'success');
    cy.get('#lastName').type(user.lastname, ({ delay: 0 })).should('be.visible', 'success');
    cy.get('#email').type(user.email, ({ delay: 0 })).should('be.visible', 'success')
    cy.get('#open-text-area').type(randomstring.generate(), ({ delay: 0 })).should('be.visible', 'success')
    cy.contains('button', 'Enviar').click()
  });
  it('Show an error message when submitting the form with an email with invalid format', () => {
    cy.get('#email').type('invalid@email', ({ delay: 0 })).should('be.visible', 'error')
  });

  it('Show an error message when the Telefone option turns into a mandatory field, but it is not filled before sending the form', () => {
    cy.get('#firstName').type(user.username, ({ delay: 0 })).should('be.visible', 'success');
    cy.get('#lastName').type(user.lastname, ({ delay: 0 })).should('be.visible', 'success');
    cy.get('#email').type(user.email, ({ delay: 0 })).should('be.visible', 'success')
    cy.get('#open-text-area').type(randomstring.generate(), ({ delay: 0 })).should('be.visible', 'success')
    cy.get('#phone-checkbox').click().should('be.visible', 'error')
  });

  it('Fill and Clean the fiels "name", "last name", "email", and "telefone"', ()  => {
    cy.get('#firstName').type(user.username, ({ delay: 0 })).should('have.value', user.username)
    .clear().should('have.value', '')

    cy.get('#lastName').type(user.lastname, ({ delay: 0 })).should('have.value', user.lastname)
    .clear().should('have.value', '');

    cy.get('#email').type(user.email, ({ delay: 0 })).should('have.value', user.email)
    .clear().should('have.value', '');
    
    cy.get('#phone').type(user.phone, ({ delay: 0 })).should('have.value', user.phone)
    .clear().should('have.value', ''); 
  });

  it('Show an error message when submitting the form without filling the mandatory fields', () => {
    cy.get('button[type="submit"]').click().should('be.visible', 'error');
  });

  it('Submit the form successfully using a custom command', () => {
    cy.fillMandatoryFieldsAndSubimit()
  });

})