describe('Blog app', function() {

  beforeEach(function() {
    cy.reset_database()
    cy.load_page()
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

  it('fails login', function() {
    cy.get('button').contains('Login').click()
    cy.get('#username').type('username2')
    cy.get('#password').type('password1')
    cy.get('#login-button').click()
    cy.get('.error').contains('Wrong credentials')
    cy.get('html').should('not.contain', 'logged in')
    cy.contains('logged in').should('not.exist')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login('username1', 'password1')
    })

    describe('and a blog exists', function() {
      beforeEach(function() {
        cy.add_blog({ title: 'title1', url: 'url1' })
      })

      it('it can be liked', function() {
        cy.contains('title1')
        cy.contains('View').click()
        cy.contains('Likes:0')
        cy.contains('Like').click()
        cy.contains('Likes:1')
      })

      it('can be removed', function() {
        cy.contains('title1')
        cy.contains('View').click()
        cy.contains('Remove').click()
        cy.get('html').should('not.contain', 'title1')
      })

      it('does not show remove button if not author', function() {
        cy.login('username2', 'password2')
        cy.contains('title1')
        cy.contains('View').click()
        cy.contains('Remove').should('not.exist')
      })
    })

  })
})
