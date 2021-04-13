Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3001/api/login', {
    username, password
  }).then(({ body }) => {
    localStorage.setItem('loggedNoteappUser', JSON.stringify(body))
    cy.visit('http://localhost:3002')
  })
})

Cypress.Commands.add('createNote', ({ content, important }) => {
  cy.request({
    url: 'http://localhost:3001/api/notes',
    method: 'POST',
    body: { content, important },
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedNoteappUser')).token}`
    }
  })
  cy.visit('http://localhost:3002')
})

describe('Note app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3002/api/testing/reset')
    const user = {
      name: 'Syed Haider',
      username: 'shaider',
      password: 'secret'
    }
    cy.request('POST', 'http://localhost:3002/api/users/', user)
    cy.visit('http://localhost:3002')
  })

  it('login fails with incorrect password', function () {
    cy.contains('log in').click()
    cy.get('#username').type('shaider')
    cy.get('#password').type('incorrect')
    cy.get('#login-button').click()

    cy.get('.error')
      .should('contain', 'Wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')

    cy.get('html').should('not.contain', 'Syed Haider logged in')
  })

  it('front page can be opened', function () {
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2021')
  })

  it('login form can be opened', function () {
    cy.contains('log in').click()
  })

  it('user can login', function () {
    cy.contains('log in').click()
    cy.get('#username').type('shaider')
    cy.get('#password').type('secret')
    cy.get('#login-button').click()

    cy.contains('Syed Haider logged in')
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'shaider', password: 'secret' })
    })

    it('a new note can be created', function () {
      cy.contains('new note').click()
      cy.get('input').type('a note created by cypress')
      cy.contains('save').click()
      cy.contains('a note created by cypress')
    })

    describe('and a note exists', function () {
      beforeEach(function () {
        cy.createNote({
          content: 'another note by cypress',
          important: false
        })
      })

      it('it can be made important', function () {
        cy.contains('another note by cypress')
          .contains('make important')
          .click()

        cy.contains('another note by cypress')
          .contains('make not important')
      })
    })

  })
})