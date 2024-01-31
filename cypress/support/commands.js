// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (username, password) => {
  cy.request('POST', 'http://localhost:3003/api/login', {
    username, password
  }).then(({ body }) => {
    localStorage.setItem('loggedBlogappUser', JSON.stringify(body))
    cy.load_page()
  })
})

Cypress.Commands.add('reset_database', () => {
  cy.request('POST', 'http://localhost:3003/api/testing/reset')
  const user = {
    name: 'name1',
    username: 'username1',
    password: 'password1'
  }
  cy.request('POST', 'http://localhost:3003/api/users/', user)
})

Cypress.Commands.add('load_page', () => {
  cy.visit('http://localhost:5173')
})

Cypress.Commands.add('add_blog', ({ title, url }) => {
  cy.request({
    url: 'http://localhost:3003/api/blogs',
    method: 'POST',
    body: { title, url, likes: 0 },
    headers: {
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
    }
  })
  cy.load_page()
})


