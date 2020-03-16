import './commands';

beforeEach(() => {
  cy.visit('/');
  let loggedIn = false;
  cy.get('body').then($body => {
    if ($body.find('[data-testid=logout-button]').length === 1) {
      loggedIn = true;
      cy.log('Logged in, logging out...');
    }
  });

  if (loggedIn) {
    cy.get('[data-testid=logout-button]').click();
  }
});
