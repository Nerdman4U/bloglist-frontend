describe('Blog app', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'name1',
      username: 'username1',
      password: 'password1'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:5173')
  })

  it('can open front page', function() {
    cy.contains('Blogs')
    cy.contains('login')
  })

  it('shows login form', function() {
    cy.get('button').contains('Login').click()
    cy.contains('Login')
    cy.get('form').contains('username')
    cy.get('form').contains('password')
  })

  it('logins', function() {
    cy.get('button').contains('Login').click()
    cy.get('#username').type('username1')
    cy.get('#password').type('password1')
    cy.get('#login-button').click()
    cy.contains('name1 logged in')
  })

  it.only('fails login', function() {
    cy.get('button').contains('Login').click()
    cy.get('#username').type('username2')
    cy.get('#password').type('password1')
    cy.get('#login-button').click()
    cy.contains('Wrong credentials')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.get('button').contains('Login').click()
      cy.get('#username').type('username1')
      cy.get('#password').type('password1')
      cy.get('#login-button').click()
    })

    it('can create a new blog', function() {
      cy.contains('Add item').click()
      cy.get('[placeholder="write title"]').type('title1')
      cy.get('[placeholder="write url"]').type('url1')
      cy.get('#add-blog').click()
      cy.contains('title1')
    })
  })
})
