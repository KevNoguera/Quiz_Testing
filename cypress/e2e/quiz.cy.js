// End-to-end tests for Tech Quiz

describe('Tech Quiz', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.intercept('GET', '/api/questions/random', { fixture: 'questions.json' });
    cy.log('Visited the homepage and waited for questions');
  });
  
  it('should start the quiz when the start button is clicked', () => {
      cy.get('button').contains('Start Quiz').should('be.visible').click();
      cy.get('h2').should('be.visible');
      cy.log('Started the quiz and verified the first question is visible');
    });
    
    it('should display the next question when an answer is selected', () => {
      cy.get('button').click();
      cy.get('.btn-primary').first().click();
      cy.get('h2').should('be.visible');
      cy.log('Selected an answer and verified the next question is visible');
    });
    
    it('should display the final score when the quiz is completed', () => {
      cy.get('button').click();
      for (let i = 0; i < 20; i++) {
        cy.get('.btn-primary').first().click();
      } 
      cy.get('.alert-success').should('be.visible');
      cy.log('Completed the quiz and verified the final score is visible');
    });
    
    it('should allow starting a new quiz after completion', () => {
      cy.get('button').click();
      for (let i = 0; i < 20; i++) {
        cy.get('.btn-primary').first().click();
      }
      cy.get('.alert-success').should('be.visible');
      cy.get('button').click();
      cy.get('button').should('be.visible');
      cy.log('Started a new quiz after completion and verified the start button is visible');
    });
  });