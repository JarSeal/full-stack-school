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
});