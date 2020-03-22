import './commands';
const resizeObserverLoopErrRe = /^ResizeObserver loop limit exceeded/

Cypress.on('uncaught:exception', (err) => {
  if (resizeObserverLoopErrRe.test(err.message)) {
    // returning false here prevents Cypress from failing the test
    return false;
  }
});

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
