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
      cy.contains('log in').click()
      cy.get('#username').type('shaider')
      cy.get('#password').type('secret')
      cy.get('#login-button').click()
    })

    it('a new note can be created', function () {
      cy.contains('new note').click()
      cy.get('input').type('a note created by cypress')
      cy.contains('save').click()
      cy.contains('a note created by cypress')
    })

    describe('and a note exists', function () {
      beforeEach(function () {
        cy.contains('new note').click()
        cy.get('input').type('another note by cypress')
        cy.contains('save').click()
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