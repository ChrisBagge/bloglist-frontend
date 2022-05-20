describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      "username": "chris",
      "name": "Chris Bagge",
      "password": "test"
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })
  it('user can login', function () {
    cy.get('#username').type('chris')
    cy.get('#password').type('test')
    cy.get("#login-button").click()

    cy.contains('Chris Bagge logged-in')
  })

  it('login fails with wrong password', function () {
    cy.get('#username').type('chrsi')
    cy.get('#password').type('tset')
    cy.get("#login-button").click()

    cy.contains('wrong username or password')
  })


  describe('when logged in', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'chris', password: 'test'
      }).then(response => {
        localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })
    })
    /*
    cy.get('#username').type('chris')
    cy.get('#password').type('test')
    cy.get("#login-button").click()
  })*/
    it('a new blog can be created', function () {
      cy.get('#new-blog').click()
      cy.get('#title').type('title')
      cy.get('#author').type('chris')
      cy.get('#url').type('www.example.com')
      cy.get('#create-button').click()

      cy.contains('a new blog title by chris added')
    })
  })
})
