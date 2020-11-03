describe('Blog app ', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    const user = {
      name: 'Admin',
      username: 'root',
      password: 'sekret'
    };
    cy.request('POST', 'http://localhost:3001/api/users/', user) ;
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function() {
    cy.contains('Blogs');
    cy.contains('Login');
  });

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#login-user').type('root');
      cy.get('#login-pass').type('sekret');
      cy.get('#login-button').click();

      cy.contains('Admin logged in');
    });

    it('fails with wrong credentials', function() {
      cy.get('#login-user').type('root');
      cy.get('#login-pass').type('wrong');
      cy.get('#login-button').click();

      cy.get('.notification')
        .should('contain', 'Wrong username or password!')
        .and('have.css', 'background-color', 'rgb(255, 191, 69)');
    });
  });

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'root', password: 'sekret' });
    });

    it('A blog can be created', function() {
      cy.get('.toggle-button').click();
      cy.contains('Create new blog');
      cy.get('#create-title').type('My First Blog');
      cy.get('#create-author').type('John Dow Jones');
      cy.get('#create-url').type('http://www.dummytext.com');
      cy.get('#create-new-button').click();
      cy.get('.blog-list')
        .should('contain', 'My First Blog')
        .and('contain', 'John Dow Jones');
    });
  });
});