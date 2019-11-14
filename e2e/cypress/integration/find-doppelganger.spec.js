describe('find doppelganger', () => {
  it('finds doppelganger', () => {
    cy.get('[data-testid=find-doppelganger-nav-link]')
      .click();

    cy.url()
      .should('eq', Cypress.config().baseUrl + '/signup');

    cy.login('userWithDoppelganger');

    cy.get('[data-testid=find-doppelganger-nav-link]')
      .click();
    cy.url()
      .should('eq', Cypress.config().baseUrl + '/find-doppelganger');

    cy.get('[data-testid=find-doppelganger-heading]')
      .should('be.visible')
      .should('have.text', 'Find Your Doppelganger');

    cy.get('[data-testid=doppelganger-score]')
      .should('be.visible')
      .should('have.text', '66.67%');

    cy.get('[data-testid=source-answers]')
      .children()
      .should($answerComparions => {
        expect($answerComparions).to.have.length(2);
      });

    cy.get('[data-testid=target-answers]')
      .children()
      .should($answerComparions => {
        expect($answerComparions).to.have.length(2);
      });
  });
});
