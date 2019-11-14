describe('quiz', () => {
  it('cycles to next question after answering', () => {
    cy.login('noAnsweredQuestions');
    cy.get('[data-testid=quiz-nav-link]')
      .click();

    cy.url()
      .should('eq', Cypress.config().baseUrl + '/quiz');

    cy.get('[data-testid=quiz-heading]')
      .should('be.visible')
      .should('have.text', 'Quiz');

    cy.get('[data-testid=quiz-question-text]')
      .should('be.visible')
      .should('have.text', 'Who is the best villain?');

    cy.get('[data-testid=quiz-answers]')
      .children()
      .should($answers => {
        expect($answers).to.have.length(3);
        expect($answers.eq(0)).to.contain('Jar Jar Binks');
        expect($answers.eq(1)).to.contain('Darth Maul');
        expect($answers.eq(2)).to.contain('Darth Vader');
      });

    cy.get('[data-testid=quiz-answers]')
      .children()
      .first()
      .click()

    cy.get('[data-testid=quiz-question-text]')
      .should('be.visible')
      .should('have.text', 'Who is the best DJ?');

    cy.get('[data-testid=quiz-answers]')
      .children()
      .should($answers => {
        expect($answers).to.have.length(3);
        expect($answers.eq(0)).to.contain('Paris Hilton');
        expect($answers.eq(1)).to.contain('Diplo');
        expect($answers.eq(2)).to.contain('A-Trak');
      });

    cy.get('[data-testid=quiz-answers]')
      .children()
      .first()
      .click()

    // On reload should not see questions that were already answered
    cy.reload();

    cy.get('[data-testid=quiz-question-text]')
      .should('be.visible')
      .should('have.text', 'Who was the best Seinfeld character?');

    cy.get('[data-testid=quiz-answers]')
      .children()
      .should($answers => {
        expect($answers).to.have.length(4);
        expect($answers.eq(0)).to.contain('George');
        expect($answers.eq(1)).to.contain('Kramer');
        expect($answers.eq(2)).to.contain('Elaine');
        expect($answers.eq(3)).to.contain('Jerry');
      });
  });
});
