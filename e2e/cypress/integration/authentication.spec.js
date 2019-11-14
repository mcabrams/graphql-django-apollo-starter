describe('authentication', () => {
  it('supports signup, login and logout', () => {
    /* Test Registration */
    cy.get('#root')
      .should('contain', 'Hello world');

    // cy.getCookie('csrftoken').should('exist');

    const username = 'foo';
    const password = 'foobar1234';
    const email = 'foo@example.com';

    cy.get('[data-testid=auth-dropdown-nav-link]')
      .trigger('mouseover');

    cy.get('[data-testid=signup-nav-link]')
      .should('be.visible');

    cy.get('[data-testid=signup-nav-link]')
      .click();

    cy.url()
      .should('eq', Cypress.config().baseUrl + '/signup');

    cy.get('[data-testid=username-input]')
      .type(username);
    cy.get('[data-testid=password-input]')
      .type(password);
    cy.get('[data-testid=email-input]')
      .type(email);
    cy.get('[data-testid=signup-submit-button]')
      .click();

    cy.url()
      .should('eq', Cypress.config().baseUrl + '/');
    cy.get('[data-testid=logout-button]')
      .should('be.visible');
    cy.get('[data-testid=auth-dropdown-nav-link]')
      .should('not.be.visible');
    // our auth cookie should be present
    // cy.getCookie('your-session-cookie').should('exist')

    /* Test Logout */

    cy.get('[data-testid=logout-button]')
      .click();
    cy.get('[data-testid=auth-dropdown-nav-link]')
      .should('be.visible');

    // TODO: maybe test for clearing cookie here?

    /* Test Login */

    cy.get('[data-testid=auth-dropdown-nav-link]')
      .trigger('mouseover');
    cy.get('[data-testid=login-nav-link]')
      .click();
    cy.url()
      .should('eq', Cypress.config().baseUrl + '/login');

    cy.get('[data-testid=email-input]')
      .type(email);
    cy.get('[data-testid=password-input]')
      .type(password);
    cy.get('[data-testid=login-submit-button]')
      .click();

    cy.url()
      .should('eq', Cypress.config().baseUrl + '/');
    cy.get('[data-testid=logout-button]')
      .should('be.visible');
    // our auth cookie should be present
    // cy.getCookie('your-session-cookie').should('exist')

    /* Reloading should not clear logged in state */
    cy.reload();
    cy.get('[data-testid=logout-button]')
      .should('be.visible');
  });

  it('redirects from protected routes to signup and then to referrer', () => {
    const username = 'foo2';
    const password = 'foobar12342';
    const email = 'foo2@example.com';

    // Visit protected route
    cy.get('[data-testid=protected-route-nav-link]')
      .click();

    cy.url()
      .should('eq', Cypress.config().baseUrl + '/signup');

    cy.get('[data-testid=username-input]')
      .type(username);
    cy.get('[data-testid=password-input]')
      .type(password);
    cy.get('[data-testid=email-input]')
      .type(email);
    cy.get('[data-testid=signup-submit-button]')
      .click();

    cy.url()
      .should('eq', Cypress.config().baseUrl + '/protected');
  });
});
