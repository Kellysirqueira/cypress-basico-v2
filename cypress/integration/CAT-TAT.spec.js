/// <reference types="Cypress" />
const randomstring = require("randomstring");

describe('Central de Atendimento ao Cliente TAT', function() {
  
  const user = {}
  beforeEach(() => {
    cy.visit('./src/index.html')
    user.username = randomstring.generate()
    user.lastname = randomstring.generate()
    user.email = (randomstring.generate(8)+'@email.com')
    user.phone = randomstring.generate({ length: 9, charset: ['numeric']})
    });
  
  it('Verifies the application title', function() {
    cy.title().should('equal', 'Central de Atendimento ao Cliente TAT');
  })

  it('Fill the mandatory fields and send the form', () => {
    cy.get('#firstName').type(user.username, ({ delay: 0 })).should('be.visible', 'success');
    cy.get('#lastName').type(user.lastname, ({ delay: 0 })).should('be.visible', 'success');
    cy.get('#email').type(user.email, ({ delay: 0 })).should('be.visible', 'success')
    cy.get('#open-text-area').type(randomstring.generate(), ({ delay: 0 })).should('be.visible', 'success')
    cy.contains('button', 'Enviar').click()
  })

  it('Show an error message when submitting the form with an email with invalid format', () => {
    cy.get('#email').type('invalid@email', ({ delay: 0 })).should('be.visible', 'error')
  })

  it('Show an error message when the Telefone option turns into a mandatory field, but it is not filled before sending the form', () => {
    cy.get('#firstName').type(user.username, ({ delay: 0 })).should('be.visible', 'success')
    cy.get('#lastName').type(user.lastname, ({ delay: 0 })).should('be.visible', 'success')
    cy.get('#email').type(user.email, ({ delay: 0 })).should('be.visible', 'success')
    cy.get('#open-text-area').type(randomstring.generate(), ({ delay: 0 })).should('be.visible', 'success')
    cy.get('#phone-checkbox').check().should('be.visible', 'error')
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })

  it('Fill and Clean the fiels "name", "last name", "email", and "telefone"', ()  => {
    cy.get('#firstName').type(user.username, ({ delay: 0 })).should('have.value', user.username)
      .clear().should('have.value', '')

    cy.get('#lastName').type(user.lastname, ({ delay: 0 })).should('have.value', user.lastname)
      .clear().should('have.value', '')

    cy.get('#email').type(user.email, ({ delay: 0 })).should('have.value', user.email)
      .clear().should('have.value', '')
    
    cy.get('#phone').type(user.phone, ({ delay: 0 })).should('have.value', user.phone)
      .clear().should('have.value', '')
  })

  it('Show an error message when submitting the form without filling the mandatory fields', () => {
    cy.get('button[type="submit"]').click().should('be.visible', 'error')
  })

  it('Submit the form successfully using a custom command', () => {
    cy.fillMandatoryFieldsAndSubimit()
  })

  it('Select the product (Youtube) by the text', () => {
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })

  it('Select the product (Mentoria) by its value', () => {
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })

  it('Select the product (Blog) by its index', () => {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })

  it('Check the "Feedback" attendence option', () => {
    cy.get('input[type="radio"][value="feedback"]').check().should('have.value', 'feedback');
  })

  it('Check each attendence options', () => {
    cy.get('input[type="radio"]')
      .should('have.length', 3)
      .each(function($radio) {
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
      })
  })

  it('Check both checkboxes and uncheck only one', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  it('Select one file from fixture folder', () => {
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('cypress/fixtures/example.json')
      .should(function($input) {
        console.log($input)
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })

  it('Select a file simulating drag-and-drop ', () => {
    cy.get('input[type="file"]')
    .should('not.have.value')
    .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
    .should(function($input) {
        console.log($input)
        expect($input[0].files[0].name).to.equal('example.json')
    })
  })

  it('Select a file using a fixture that has been given an alias', () => {
    cy.fixture('example.json').as('sampleFile')
    cy.get('input[type="file"]')
      .selectFile('@sampleFile')
      .should(function($input) {
        console.log($input)
        expect($input[0].files[0].name).to.equal('example.json')
    })
  })

  it('Verify that the Privacy Police opens in another tab without the need of a click', () => {
    cy.get('#privacy a').should('have.attr', 'target', '_blank')
  })

  it('Access the Privacy Policy page removing the target, then clicking on the link', () => {
    cy.get('#privacy a')
      .invoke('removeAttr', 'target')
      .click()
    cy.contains('Talking About Testing').should('be.visible')
  })
});